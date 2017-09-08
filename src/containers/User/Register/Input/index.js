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
  return (
		<div className="input-container">
			<input
				ref={inputRef}
				className={`${!isValid ? null : "is-danger"}`}
				type={inputType} 
				id={inputId} 
				required="required"
				onBlur={({ target: { value }}) => handlerInputBlur(value, inputId, validation)}
			/>
			<label for={inputId}>
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
  labelText: PropTypes.string,
  typeInput: PropTypes.string,
  handleBlur: PropTypes.func,
  isValid: PropTypes.string,
  inputId: PropTypes.string,
  validation: PropTypes.func,
  inputRef: PropTypes.func
}

export default InputComponent