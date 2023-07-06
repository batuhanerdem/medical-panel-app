import { auto } from '@popperjs/core';
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.doctor.onCreated(function () {
    const self = this
    this.goToLoginString = null
    this.patientSubs = Meteor.subscribe('patient.listForQue', Meteor.userId())
    this.patient = new ReactiveVar()
    // this.trigger = new ReactiveVar(0)

    if (!Meteor.userId()) {
        self.goToLoginString = "Lutfen giris yapiniz, login'e yonlendiriliyorsunuz  "
        Meteor.setTimeout(function () {
            FlowRouter.go("login")
        }, 2000);
    }
});

Template.doctor.onRendered(function () {
    const self = this
    this.autorun(function () {
        console.log(AppUtil.refreshToken.get());
        Meteor.call('patient.listFirstPatient', (err, res) => {
            if (err) return
            console.log("res:", res);
            self.patient.set(res)
        })
    });
});

Template.doctor.events({
    'submit .add-note': function (event, template) {
        event.preventDefault()
        const note = event.target.note.value
        Meteor.call('patient.updateNotesAndGoNext', template.patient.get(), note)
        event.target.note.value = ''
        // template.trigger.set(template.trigger.get() + 1)
        AppUtil.refreshToken.set(AppUtil.refreshToken.get() + 1)
    }
});

Template.doctor.helpers({
    isNotLoggedIn: function () {
        return Template.instance().goToLoginString
    },
    patient: function () {
        return Template.instance().patient.get()
    }
});