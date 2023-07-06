import { Meteor } from 'meteor/meteor'
// neden callasync
//meteor backend calisma tarzi
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
    this.autorun(function () {
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

        const patient = await Meteor.callAsync('patient.listByTc', tc)
        // console.log(patient);
        if (!patient) {
            template.isRegistered.set(false)
        } else {
            Meteor.call('patient.updateJoinedQueAt', patient)
            const doctor = await Meteor.callAsync('doctor.listByUserId', patient.doctorId)
            template.doctor.set(doctor)
        }
        AppUtil.refreshToken.set(AppUtil.refreshToken.get() + 1)
        console.log(AppUtil.refreshToken.get());
    },
    'submit .register': async function (event, template) {
        event.preventDefault() //To do
        const name = event.target.name.value
        const surname = event.target.surname.value
        const tc = template.tc.get()
        const gender = event.target.gender.value
        const age = event.target.age.value
        const doctorId = event.target.doctor.value
        const user = { name, surname, gender, age, tc, doctorId }

        try {
            await Meteor.callAsync("patient.create", user)
            template.isSucceed.set(true)
            Meteor.setTimeout(function () {
                template.isRegistered.set(true)
            }, 2000);
        } catch (error) {
            //ders izle
            console.log(error);
        }
    }
});

Template.enter.helpers({
    isRegistered: function () {
        return Template.instance().isRegistered.get()
    },
    doctors: function () {
        console.log('docs', Template.instance().doctors);
        return Template.instance().doctors
        //return Doctors.find({}).fetch()
    },
    doctorName: function () {
        return Template.instance().doctor.get()?.name
    },
    isSucceed: function () {
        return Template.instance().isSucceed.get()
    }
});