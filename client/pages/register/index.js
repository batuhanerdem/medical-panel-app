import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

const patients = [{ name: "hasta2" }, { name: "Hasta3" }]

Template.register.onCreated(function () {
    this.user = {}
})


Template.register.events({
    'submit form': function (event, template) {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        const user = {
            // _id: "denemeId",
            username: username,
            password: password,
            createdAt: new Date(),
            profile: {
                tc: "11111111111",
                name: "Batuhan",
                surname: "Erdem",
                //  patients: patients
            }
        }
        Meteor.logout()
        Accounts.createUser(user);
        console.log(Meteor.userId());
    }
});