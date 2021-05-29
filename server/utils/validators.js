module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {}

  if (username.trim() === '') {
    errors.username = 'Username Must Not Be Empty'
  }
  if (email.trim() === '') {
    errors.email = 'Email Must Not Be Empty'
  } else {
    const regex =
      /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-.\w]*[0-9a-zA-Z])+[a-zA-Z]{2,9})$/

    if (!email.match(regex)) {
      errors.email = 'Email Must Be A Valid Email Address'
    }
  }
  if (password === '') {
    errors.password = 'Password Must Not Be Empty'
  }
  if (confirmPassword === '') {
    errors.confirmPassword = 'Confirm Password Must Not Be Empty'
  }
  if (password !== confirmPassword) {
    errors.password = 'Passwords Do Not Match'
    errors.confirmPassword = 'Passwords Do Not Match'
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}

module.exports.validateLoginInput = (username, password) => {
  const errors = {}
  if (username.trim() === '') {
    errors.username = 'Username Must Not Be Empty'
  }
  if (password.trim() === '') {
    errors.password = 'Password Must Not Be Empty'
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  }
}
