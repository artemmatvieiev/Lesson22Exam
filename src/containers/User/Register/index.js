import React from "react"
import InputComponent from "./Input"
import * as constants from "./constants"
import * as validations from "./Input/validations"
import { setItem, getItem } from "../../../helpers/localStorage"
import { browserHistory } from "react-router"

const inputs = [
  {
    inputType: "text",
    labelText: "Username",
    inputId: constants.INPUT_ID_USERNAME,
    isValid: false,
    validation: validations.usernameIsValid,
    field: "username"
  },
  {
    inputType: "password",
    labelText: "Password",
    inputId: constants.INPUT_ID_PASSWORD,
    isValid: false,
    validation: validations.passwordIsValid,
    field: "password"
  },
  {
    inputType: "password",
    labelText: "Repeat Password",
    inputId: constants.INPUT_ID_CONFIRM_PASSWORD,
    isValid: false,
    validation: validations.confirmPasswordIsValid,
    field: "password"
  }
]

export default class RegisterContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      errors: {}
    }
  }

  handleRegisterClick = async () => {
    const users = await getItem("users").catch(() => Promise.resolve([]))
    const { errors, user } = await inputs.reduce(async (acc, { field, inputId, validation }) => {
      const _acc = await acc
      try {
        const value = this[inputId].value
        switch (inputId) {
          case `${constants.INPUT_ID_CONFIRM_PASSWORD}`: {
            const passwordValue = this[constants.INPUT_ID_PASSWORD].value
            await validation(passwordValue, value)
            break
          }
          default: await validation(value)
        }
        
        if (field == "username" && users.find(({ username }) => username == value))
          throw new Error("This username already exists!")
        
        if (field) _acc.user[field] = value
        return Promise.resolve(_acc)
      } catch ({ message }) {
        _acc.errors.push({ [inputId]: message })
        return Promise.resolve(_acc)
      }
    }, Promise.resolve({ errors: [], user: {} }))

    if (!errors.length) {
      users.push(user)

      await Promise.all([
        setItem("users", users),
        setItem("user", user)
      ])
      
      browserHistory.push("/notes")
    } else {
      this.setState(() => {
        const _errors = errors.reduce((acc, error) => {
          if (error) acc = { ...acc, ...error }
          return acc
        }, {})
        return { errors: _errors }
      })
    }

  }

  handlerInputBlur = async (value, inputId, isValid) => {
    try {
      switch (inputId) {
        case `${constants.INPUT_ID_CONFIRM_PASSWORD}`: {
          const passwordValue = this[constants.INPUT_ID_PASSWORD].value
          await isValid(passwordValue, value)
          break
        }
        default: await isValid(value)
      }
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
	handleClickRegister = () => {
		document.getElementsByClassName("container")[0].classList.add("active")
	}
	handleClickLogin = () => {
		document.getElementsByClassName("container")[0].classList.remove("active")
	}

  render() {
    const { errors } = this.state
    const registerIsDisabled = !!Object.keys(errors).length

    return (
      <div className="card alt">
				<div 
					className="toggle"
					onClick={this.handleClickRegister}
				>
				</div>
				<h1 className="title">Register
					<div 
						className="close"
						onClick={this.handleClickLogin}
					>
					</div>
				</h1>
				<form>
					{
						inputs.map(({ inputId, validation, labelText, typeInput }, index) => (
							<InputComponent
								key={index}
								inputRef={input => this[inputId] = input}
								handlerInputBlur={this.handlerInputBlur}
								isValid={errors[inputId]}
								labelText={labelText}
								typeInput={typeInput}
								inputId={inputId}
								validation={validation}
							/>
						))
					}
					<div className="button-container">
						<button
							disabled={registerIsDisabled}
							onClick={this.handleRegisterClick}
						>
							<span>Next</span>
						</button>
					</div>
				</form>
			</div>
    )
  }
}