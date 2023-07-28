import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.patient.onCreated(function () {
    this.doctorNames = new ReactiveVar([])
    this.doctor = new ReactiveVar()
    this.id = FlowRouter.getParam('id');

    Meteor.call('doctor.listNamesAndIds', (err, res) => {
        if (err) return
        this.doctorNames.set(res)
    })

    Meteor.call('doctor.showByUserId', this.id, (err, res) => {
        if (err) return
        this.doctor.set(res.profile)
    })
})

Template.patient.onRendered(function () {
    const self = this
    this.autorun(function () {
        Meteor.call("patient.updateFirstPatient", self.id)
        Patients.find().fetch() // patients'i dinlemek icin
    });
});

Template.patient.helpers({
    doctorNames: function () {
        return Template.instance().doctorNames.get()
    },
    patients: function () {
        const patients = Patients.find({ doctorId: Template.instance().id }, { sort: { joinedQueAt: 1 } }).fetch()
        return patients
    },
    doctorName: function () {
        return Template.instance().doctor.get().name
    },
});