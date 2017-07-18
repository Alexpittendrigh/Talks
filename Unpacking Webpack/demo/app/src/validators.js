export function validateName (name) {
  return { isValid: !!name, help: !!name ? 'You must have a name!': '' }
}
export function validateEmail (email) {
  var isValid = !!email

  isValid = isValid &&
    email.length > 3 &&
    email.indexOf('@') > -1
  
  return { isValid: isValid, help: isValid ? '' : 'Your email address is invalid' }
}