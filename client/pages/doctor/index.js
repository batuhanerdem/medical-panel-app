import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.doctor.onCreated(function () {
    //todo
})

Template.doctor.onRendered(function () {

})

Template.doctor.events({
    'click .btn-register': function (event, template) {
        FlowRouter.go("register")
    }
}); 
