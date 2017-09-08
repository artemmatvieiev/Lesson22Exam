import React from "react"
import LoginContainer from "./Login"
import RegisterContainer from "./Register"
import "./index.scss"

export default (props) => {
  return (
    <div className="container">
			<div className="card"></div>
			<LoginContainer />
			<RegisterContainer />
		</div>
  )
}