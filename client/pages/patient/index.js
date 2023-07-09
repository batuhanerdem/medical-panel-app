import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.patient.onCreated(function () {
    this.doctors = new ReactiveVar([])
    this.doctor = new ReactiveVar()
    this.id = FlowRouter.getParam('id');

    Meteor.call('doctor.list', (err, res) => {
        if (err) return
        this.doctors.set(res)
    })

    Meteor.call('doctor.showByUserId', this.id, (err, res) => {
        if (err) return
        this.doctor.set(res)
    })
})

Template.patient.onRendered(function () {
    const self = this
    this.autorun(function () {
        Meteor.call("patient.updateFirstPatient", self.id)
        Patients.find().fetch()
    });
});

Template.patient.helpers({
    doctors: function () {
        return Template.instance().doctors.get()
    },
    patients: function () {
        const patients = Patients.find({ doctorId: Template.instance().id }, { sort: { joinedQueAt: 1 } }).fetch()
        return patients
    },
    doctor: function () {
        return Template.instance().doctor.get()
    },
    eq: function (a, b) { return a == b }//lib'e tasinacak
});