import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.patient.onCreated(function () {
    this.state = new ReactiveDict(null, {
        doctors: [],
        currentDoctor: null
    })
    this.id = FlowRouter.getParam('id') || null

    Meteor.call('doctor.listNamesAndIds', (err, res) => {
        if (err) return
        this.state.set('doctors', res)
    })
    if (!this.id) return
    Meteor.call('doctor.showByUserId', { _id: this.id }, (err, res) => {
        if (err) return
        this.state.set('currentDoctor', res)
    })
})

Template.patient.onRendered(function () {
    const self = this
    this.autorun(function () {
        Patients.find().fetch() // patients'i dinlemek icin
        Meteor.call("patient.updateFirstPatient", { doctorId: self.id })
    });
});

Template.patient.helpers({
    doctors: function () {
        const doctors = Template.instance().state.get('doctors')
        return doctors
    },
    patients: function () {
        const patients = Patients.find({ doctorId: Template.instance().id }, { sort: { joinedQueAt: 1 } }).fetch()
        return patients
    },
    doctorName: function () {
        const currentDoctor = Template.instance().state.get('currentDoctor')
        return currentDoctor?.profile.name
    },
});