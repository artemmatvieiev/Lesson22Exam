import React from "react"
import PropTypes from "prop-types"

const InputComponent = ({
  inputType,
	labelText,
  inputRef,
  handlerInputBlur,
	validation,
  inputId,
  isValid
}) => {
	console.log(isValid)
  return (
		<div className="input-container">
			<input
				ref={inputRef}
				className={`${!isValid ? null : "is-danger"}`}
				type={inputType} 
				id={inputId} 
				required="required"
				onBlur={ event => handlerInputBlur(event, inputId, validation)}
			/>
			<label htmlFor={inputId}>
				{labelText}
			</label>
			<div className="bar"></div>
			{
        !isValid ? null : (<p className="is-danger">{isValid}</p>)
      }
		</div>
  )
}

InputComponent.propTypes = {
  inputType: PropTypes.string,
	labelText: PropTypes.string,
  inputRef: PropTypes.func,
  handlerInputBlur: PropTypes.func,
  inputId: PropTypes.string,
  isValid: PropTypes.string,
	validation: PropTypes.func
}


export default InputComponent