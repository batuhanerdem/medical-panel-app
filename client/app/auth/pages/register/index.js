import { Accounts } from 'meteor/accounts-base'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.register.events({
    'submit form': function (event, template) {
        event.preventDefault()
        const { username, password, tc, name, surname } = event.target

        const user = {
            username: username.value, password: password.value, profile: {
                tc: tc.value,
                name: name.value,
                surname: surname.value
            }
        }
        Accounts.createUser(user, function (error) {
            error ? errorHandler(error) : FlowRouter.go("doctor")
        });
    }
});