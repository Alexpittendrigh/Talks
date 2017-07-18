import { validateEmail } from './validators'

var store = {
  email : {
    value: '',
    validationState: {
      isValid: true,
      help: ''
    }
  },
  name: {
    value: '',
    validationState: {
      isValid: true,
      help: ''
    }
  }
}

function setEmail (email) {
  store.email.value = email
  store.email.validationState = validateEmail(email)
  if (store.email.validationState.help.length > 0) {
    alert(store.email.validationState.help)
  }
  console.log('store.email.value', store.email.value)
}

function setName (name) {
  store.name.value = name.target.value
}

var formActions = {
  setEmail: setEmail
}

export default formActions 