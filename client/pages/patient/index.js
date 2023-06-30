import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.patient.onCreated(function () {
    const self = this
    self.patients = new ReactiveVar([])
    self.doctors = new ReactiveVar([])

    Meteor.call('doctor.list', (err, res) => {
        if (err) return
        self.doctors.set(res)
    })
})

Template.patient.onRendered(function () {
    const self = this
    const id = FlowRouter.getParam('id');
    Meteor.call('doctor.listByUserId', id, (err, res) => {
        console.log('res', res);
    })
    console.log(id);
    this.autorun(function () {
        //pub subs
        Meteor.call('patient.listByDoctorId', (id), (err, res) => {
            if (err) return
            console.log('patients', res);
            const firstPatient = res[0]
            Meteor.call('patient.updateStatus', firstPatient, "in-progress")
            self.patients.set(res)
        })
    });
    console.log(self.patients.get());

    this.autorun(function () {
        Meteor.publish('patient.list')
    })
});

Template.patient.helpers({
    doctors: function () {
        console.log("docs", Template.instance().doctors);
        return Template.instance().doctors.get()
        //return Doctors.find({}).fetch()
    },
    patients: function () {
        return Template.instance().patients.get()
    },
    doctor: function () {
        //todo
    },
    eq: function (a, b) { return a == b }
});