import { Meteor } from 'meteor/meteor'


Template.enter.onCreated(function () {
    const self = this

    this.doctor = new ReactiveVar()
    this.doctorId = new ReactiveVar()
    this.doctors = new ReactiveVar()
    this.isRegistered = new ReactiveVar(true)
    this.tc = new ReactiveVar()

    //doctor ve patient subscribelar
    Meteor.subscribe("doctor.list", {
        onReady: function () {
            const doctors = Doctors.find({}).fetch()
            self.doctors.set(doctors)
        },
        onError: function () {
            console.log('onError', arguments)
        }
    })
    Meteor.subscribe("patient.list", {
        onReady: function () {
            console.log('onReady', arguments)
        },
        onError: function () {
            console.log('onError', arguments)
        }
    })
    this.autorun(function () { //BUTONA BASTIGINDA CALISMASINI ISTEDIGIN SEYLERI EVENTSE YAZ

    })
});

Template.enter.events({
    'submit .tc': function (event, template) {
        event.preventDefault()
        const tc = event.target.tc.value
        template.tc.set(tc)

        const patient = Patients.findOne({ tc })
        if (!patient) {
            template.isRegistered.set(false)

            console.log("patient yok");
            template.doctorId.set(null)
            template.doctor.set(null)

        } else {
            template.doctorId.set(patient.doctorId)
            const doctor = Doctors.findOne({ userId: template.doctorId.get() })
            template.doctor.set(doctor)
        }
        console.log("doctor get", template.doctor.get());
        console.log('doctorId:', template.doctorId.get());

    },
    'submit .register': function (event, template) {
        event.preventDefault()
        const t = event.target
        const name = t.name.value
        const surname = t.surname.value
        const tc = template.tc.get()
        const gender = t.gender.value
        const age = t.age.value
        const doctorId = t.doctor.value
        const user = { name, surname, gender, age, tc, doctorId }
        Meteor.call("patient.create", user)

        template.doctorId.set(doctorId)
        template.isRegistered.set(true)
    }
});
Template.enter.helpers({
    isRegistered: function () {
        return Template.instance().isRegistered.get()
    },
    doctors: function () {
        return Template.instance().doctors.get()
    },
    doctorName: function () {
        return Template.instance().doctor.get().name
    }
});