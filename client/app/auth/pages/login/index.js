import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.login.onCreated(function () {
    this.pageToGo = FlowRouter.getQueryParam('redirect') ?? 'doctor' //takes the left unless it is null
});

Template.login.events({
    'submit form': function (event, template) {
        event.preventDefault()
        const username = event.target.username.value
        const password = event.target.password.value
        Meteor.loginWithPassword({ username }, password, function (error) {
            error ? errorHandler(error) : FlowRouter.go(template.pageToGo)
        })
    }
});
