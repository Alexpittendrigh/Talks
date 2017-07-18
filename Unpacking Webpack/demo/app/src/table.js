import axios from 'axios'
import styles from './globalStyle.css'

function renderSubscriber (subscriber) {
  return `<tr><td>${subscriber.email}</td><td>${subscriber.name}</td></tr>`
}

function renderSubscribers (subscribers) {
  return subscribers.map(s => renderSubscriber(s))
}

function render (subscribers) {
  return `<table class='${styles.table}'>
    <thead>
      <tr><th>email</th><th>name</th></tr>
    </thead>
    <tbody>
      ${renderSubscribers(subscribers)}
    </tbody>
  </table>`
}
var apiUrl = __apiURL__
function refresh () {
  return axios.get(apiUrl + '/mailingList')
}

const table = {
  refresh: refresh,
  render: render
}

export default table