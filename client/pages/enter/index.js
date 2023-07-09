import { Meteor } from 'meteor/meteor'

Template.enter.onCreated(function () {
    const self = this

    this.tc = new ReactiveVar()
    this.doctor = new ReactiveVar()
    this.isRegistered = new ReactiveVar(true)
    this.isSucceed = new ReactiveVar(false)

    Meteor.call('doctor.list', (err, res) => {
        if (err) return
        self.doctors = res || []
    })
});

Template.enter.events({
    'submit .tc': async function (event, template) {
        event.preventDefault()
        const tc = event.target.tc.value
        if (!tc) return
        template.tc.set(tc)

        const patient = await Meteor.callAsync('patient.showByTc', tc)
        if (!patient) {
            template.isRegistered.set(false)
            template.doctor?.set(null)
        } else {
            template.isRegistered.set(true)
            Meteor.call('patient.updateJoinedQueAt', patient)
            const doctor = await Meteor.callAsync('doctor.showByUserId', patient.doctorId)
            template.patientName = patient.name
            template.doctor.set(doctor)
        }

    },
    'submit .register': function (event, template) {
        event.preventDefault()
        const name = event.target.name.value
        const surname = event.target.surname.value
        const tc = template.tc.get()
        const gender = event.target.gender.value
        const age = event.target.age.value
        const doctorId = event.target.doctor.value
        const user = { name, surname, gender, age, tc, doctorId }

        Meteor.call("patient.create", user)
        template.isSucceed.set(true)

        Meteor.setTimeout(function () {
            template.isRegistered.set(true)
            template.isSucceed.set(null)
        }, 2000);

    }
});

Template.enter.helpers({
    isRegistered: function () {
        return Template.instance().isRegistered.get()
    },
    doctors: function () {
        return Template.instance().doctors
    },
    doctorName: function () {
        return Template.instance().doctor.get()?.name
    },
    patientName: function () {
        return Template.instance().patientName.name
    },
    isSucceed: function () {
        return Template.instance().isSucceed.get()
    }
});