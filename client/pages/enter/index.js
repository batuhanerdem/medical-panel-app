import { Meteor } from 'meteor/meteor'

Template.enter.onCreated(function () {
    const self = this

    this.doctor = new ReactiveVar()
    this.doctors = new ReactiveVar()
    this.isRegistered = new ReactiveVar(true)
    this.tc = new ReactiveVar()
    this.isSucceed = new ReactiveVar(false)

    // Meteor.subscribe("doctor.list")


    this.autorun(async function () {
        if (!self.isRegistered.get()) {
            self.doctor.set(null)
        }
    })
});

Template.enter.events({
    'submit .tc': async function (event, template) {
        event.preventDefault()
        const tc = event.target.tc.value
        if (!tc) return
        template.tc.set(tc)

        const patient = await Meteor.callAsync('patient.list', tc)
        console.log(patient);
        if (!patient) {
            console.log('if');
            template.isRegistered.set(false)
        } else {
            console.log(patient.doctorId);
            const doctor = await Meteor.callAsync('doctor.listByUserId', patient.doctorId)
            console.log(doctor);
            template.doctor.set(doctor)
        }

    },
    'submit .register': async function (event, template) {
        event.preventDefault()
        const name = event.target.name.value
        const surname = event.target.surname.value
        const tc = template.tc.get()
        const gender = event.target.gender.value
        const age = event.target.age.value
        const doctorId = event.target.doctor.value
        const user = { name, surname, gender, age, tc, doctorId }

        template.isSucceed.set(await Meteor.callAsync("patient.create", user))
        //  template.isRegistered.set(true)
    }
});

Template.enter.helpers({
    isRegistered: function () {
        return Template.instance().isRegistered.get()
    },
    doctors: function () {
        return Doctors.find({}).fetch()
    },
    doctorName: function () {
        return Template.instance().doctor.get().name
    },
    isSucceed: function () {
        return Template.instance().isSucceed.get()
    }
});

Template.enter.onDestroyed(function () {
    this.subsDoctor.stop() //calismiyor, bakilacak
    this.subsPatient.stop()
});