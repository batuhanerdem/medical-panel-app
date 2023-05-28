import { Meteor } from 'meteor/meteor';

const user = {
    username: "deneme",
    password: "deneme"
}
Template.login.onRendered(function () {
    console.log(Meteor.loggingIn());
    Meteor.loginWithPassword({ username: "batuhan" }, "erdem")

})