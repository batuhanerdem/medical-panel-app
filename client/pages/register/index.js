import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'

Template.register.onCreated(function () {
    this.user = {}
})


Template.register.events({
    'submit form': function (event, template) {
        const crypto = require('crypto');

        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        const tc = event.target.tc.value
        const name = event.target.name.value
        const surname = event.target.surname.value
        //  console.log("logging", tc, name, surname);
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

        const user = {
            // _id: "denemeId",
            username: username,
            password: password,

            // services: {},
            profile: {
                tc: tc,
                name: name,
                createdAt: new Date(),
                surname: surname,
            }
        }
        const validationContext = userSchema.newContext();
        const isValid = validationContext.validate(user);

        if (!isValid) {
            const validationErrors = validationContext.validationErrors();
            console.log('Şema doğrulama hataları:', validationErrors);
        } else {
            console.log('Şema doğrulama başarılı!');
        }
        Meteor.UserProfile
        //  Meteor.logout()
        Accounts.createUser({
            username, password, profile: {
                tc,
                name,
                createdAt: new Date(),
                surname

            }
        });
        // Meteor.users.insert(user)
        //  console.log(Meteor.userId());
    }
});