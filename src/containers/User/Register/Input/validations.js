export const usernameIsValid = async function (value) {
  const regExp = /^[a-z0-9\_\.]{3,}$/i

  if (!regExp.test(value)) throw new Error("Username is not valid!")
}

export const passwordIsValid = async function (value) {
  const regExp = /^[a-z0-9]{6,}$/i

  if (!regExp.test(value)) throw new Error("Password is not valid!")
}

export const confirmPasswordIsValid = async function (passwordValue, value) {
  if (!passwordValue || !value || passwordValue != value) throw new Error("Confirm password is not equal with Password!")
}