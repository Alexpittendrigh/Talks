import Button from './button'
import table from './table'
import store from './store'
import styles from './globalStyle.css'
import Logo from './logo'

var formActions = require('./formActions')

var form = document.getElementById('mail-list-form')
form.innerHTML = form.innerHTML + Button.button

var app = document.getElementById('app')
app.innerHTML = Logo + app.innerHTML

var email = document.getElementById('email')
email.onchange = (event) => { 
  formActions.default.setEmail(event.target.value)
}

var prodTable = document.getElementById('prod')
table.refresh().then(function (response) {
  var stagingTable = document.getElementById('staging')

  var data = response.data
  data = !Array.isArray(data) ? [data] : data
  store.subscribers = data
  Button.attachEl(store.subscribers, table.refresh, table.render)
  stagingTable.innerHTML = table.render(data);
})

if (module.hot) {
  module.hot.accept('./button', function() {
    console.log('Accepting the updated button module!');

    document.getElementById('myButton').remove()

    app.innerHTML = app.innerHTML + Button.button
    Button.attachEl(store.subscribers, table.refresh, table.render)
  })
}

if (__isDebug__) {
  console.log('loaded!')
}