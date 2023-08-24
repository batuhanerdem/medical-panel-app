import { Accounts } from 'meteor/accounts-base'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.register.events({
    'submit form': function (event, template) {
        event.preventDefault()
        const { username, password, tc, name, surname } = event.target
        // const username = event.target.username.value
        // const password = event.target.password.value
        // const tc = event.target.tc.value
        // const name = event.target.name.value
        // const surname = event.target.surname.value

        const user = {
            username: username.value, password: password.value, profile: {
                tc: tc.value,
                name: name.value,
                surname: surname.value
            }
        }
        Accounts.createUser(user, function (error) {
            error ? console.log("error:", error.message) : FlowRouter.go("doctor")
        });
    }
});