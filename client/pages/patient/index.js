import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.patient.onCreated(function () {
    this.patients = new ReactiveVar([])
    this.doctors = new ReactiveVar([])
    this.doctor = new ReactiveVar()
    this.id = FlowRouter.getParam('id');

    //publish yerine hasta sira aldiginda call'u trigerlayacak bir sey yazilacak
    this.subsPatients = Meteor.subscribe('patient.listForQue', this.id) //destroyda stopla

    Meteor.call('doctor.list', (err, res) => {
        if (err) return
        this.doctors.set(res)
    })

    Meteor.call('doctor.listByUserId', this.id, (err, res) => {
        if (err) return
        this.doctor.set(res)
    })
})

Template.patient.onRendered(function () {
    const self = this
    this.autorun(function () {
        Meteor.call("patient.updateFirstPatient", self.id)
        self.patients.set(Patients.find({ doctorId: self.id }).fetch())

    });
});

Template.patient.helpers({
    doctors: function () {
        return Template.instance().doctors.get()
    },
    patients: function () {
        // return Template.instance().patients.get()
        return Patients.find({ doctorId: Template.instance().id }).fetch()
    },
    doctor: function () {
        return Template.instance().doctor.get()
    },
    eq: function (a, b) { return a == b }//lib'e tasinacak
});