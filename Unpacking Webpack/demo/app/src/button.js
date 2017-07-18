import axios from 'axios'
import emailIcon from './emailIcon.js'

function refreshTable (subs, render) {
  var stagingTable = document.getElementById('staging')
  stagingTable.innerHTML = render(subs);
}

var apiUrl = __apiURL__
var Button = {
	button: `<button id='myButton'>Subscribe${emailIcon}</button>`,
	attachEl: function (subscribers, refresh, render) {
		document.getElementById('myButton').addEventListener('click', () => {
			var email = document.getElementById('email').value
			var name = document.getElementById('name').value
			if (email.length > 0) {
				refreshTable(subscribers, render)
				axios.post(`${apiUrl}/mailingList`, subscribers)
				.then(function (response) {
					console.log(response)
				})
				.catch(function (error) {
					console.log(error);
				});
			}
			subscribers.push({
				email: email,
				name: name
			})
		});
	}
};

export default Button;