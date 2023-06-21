import { Meteor } from 'meteor/meteor'

Template.patient.onCreated(function () {
    Meteor.subscribe("patient.list", {
        onReady: function () {
            console.log('onReady', arguments)
        },
        onError: function () {
            console.log('onError', arguments)
        },
    });
})

Template.patient.onRendered(function () {
    this.autorun(function () {
        const patients = Patients.find({}).fetch()
        if (patients.length == 0) return
        console.log(patients);
    });
});

Template.patient.helpers({
    //patients: this.patients
});

