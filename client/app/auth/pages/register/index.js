import { Accounts } from 'meteor/accounts-base'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import PROFESSIONS from '/lib/utils/enums/profession-enums.js'

Template.register.events({
    'submit form': function (event, template) {
        event.preventDefault()
        const { username, password, tc, name, surname, profession } = event.target

        const user = {
            username: username.value, password: password.value, profile: {
                tc: tc.value,
                name: name.value,
                surname: surname.value,
                profession: profession.value
            }
        }
        Accounts.createUser(user, function (error) {
            error ? errorHandler(error) : FlowRouter.go("doctor")
        });
    }
});

Template.register.helpers({
    professions: function () {
        return Object.keys(PROFESSIONS).map(key => {
            return {
                key: key,
                value: PROFESSIONS[key]
            }
        })
    }
});