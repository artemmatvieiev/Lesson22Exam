import React from "react"
import InputComponent from "./Input"
import { usernameIsValid, passwordIsValid } from "../Register/Input/validations"
import { Link, browserHistory } from "react-router"
import { getItem, setItem } from "../../../helpers/localStorage"



const INPUT_ID_USERNAME = "INPUT_ID_USERNAME"
const INPUT_ID_PASSWORD = "INPUT_ID_PASSWORD"

const inputs = [
  {
    inputType: "text",
    labelText: "Username",
    inputId: INPUT_ID_USERNAME,
    isValid: false,
    validation: usernameIsValid,
    field: "username"
  },
  {
    inputType: "password",
    labelText: "Password",
    inputId: INPUT_ID_PASSWORD,
    isValid: false,
    validation: passwordIsValid,
    field: "password"
  }
]

export default class LoginContainer extends React.PureComponent {
  inputs = {}
  state = {
    errors: {}
  }
  
  constructor(props) {
    super(props)
  }

  handlerInputBlur = async (event, inputId, validation) => {
    try {
      await validation(this.inputs[inputId].value)
      this.setState(({ errors }) => {
        delete errors[inputId]
        return {
          errors: { ...errors }
        }
      })
    } catch ({ message }) {
      this.setState(({ errors }) => ({
        errors: {
          ...errors,
          [inputId]: message
        }
      }))
    }
  }

  handlerLoginClick = async () => {
    const users = await getItem("users").catch(() => Promise.resolve([]))

    const { errors, user } = await inputs.reduce(async (acc, { field, inputId, validation }) => {
      const _acc = await acc
      try {
        const value = this.inputs[inputId].value
        await validation(value)
        _acc.user[field] = value
        return Promise.resolve(_acc)
      } catch ({ message }) {
        _acc.errors.push({ [inputId]: message })
        return Promise.resolve(_acc)
      }
    }, Promise.resolve({ errors: [], user: {} }))
    if (errors.length) {
      this.setState(() => {
        const _errors = errors.reduce((acc, error) => {
          if (error) acc = { ...acc, ...error }
          return acc
        }, {})
        return { errors: _errors }
      })
    } else {
      const _user = users.find(({ username, password }) => username == user.username && user.password == password)
      if (_user) {
        await setItem("user", _user)
        browserHistory.push("/notes")
      } else {
        this.setState({
          errors: inputs.reduce((acc, { inputId }) => {
            acc[inputId] = "Is not valid!"
            return acc
          }, {})
        })
      } 
    }
  }

  render() {
    const { errors } = this.state
    const isDisabled = !!Object.keys(errors).length
    return (
      <div className="card">
				<h1 className="title">Login</h1>
				<form>
					{
						inputs.map((input, index) => (
							<InputComponent 
								{...input}
								key={index}
								isValid={errors[input.inputId]}
								inputRef={el => this.inputs[input.inputId] = el}
								handlerInputBlur={this.handlerInputBlur}
							/>
						))
					}
					<div className="button-container">
						<button
							disabled={isDisabled}
							onClick={this.handlerLoginClick}
						>
							<span>Go</span>
						</button>
					</div>
					<div className="footer"><a href="#">Forgot your password?</a></div>
				</form>
			</div>                    
    )
  }
}