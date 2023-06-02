import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.loginTest.events({
    'submit form': function (event, template) {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        Meteor.loginWithPassword({ username }, password, function (error) {
            error ? console.log(error.message) : FlowRouter.go("doctor")
        })
    }
});