import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.doctor.events({
    'click .btn-register': function (event, template) {
        FlowRouter.go("register")
    }
}); 
