import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Template.register.events({
    'submit form': function (event, template) {
        event.preventDefault()

        const username = event.target.username.value
        const password = event.target.password.value
        const tc = event.target.tc.value
        const name = event.target.name.value
        const surname = event.target.surname.value

        const user = {
            username, password, profile: {
                tc,
                name,
                createdAt: new Date(),
                surname
            }
        }
        //  Meteor.logout()
        Accounts.createUser(user, function (error) {
            if (error) console.log("er", error.message);
            else console.log("Basariyla kayit olundu");
        });
        //  console.log(Meteor.userId());
    }
});