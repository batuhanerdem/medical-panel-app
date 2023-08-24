import { Meteor } from 'meteor/meteor'

Template.enter.onCreated(function () {
    const self = this

    this.error = new ReactiveVar(null)
    this.tc = new ReactiveVar()
    this.doctor = new ReactiveVar()
    this.isRegistered = new ReactiveVar(true)
    this.isSucceed = new ReactiveVar(false)

    Meteor.call('doctor.listNamesAndIds', (err, res) => {
        if (err) return
        this.doctors = res
    })

    this.updateAfterAddingQue = async (patient) => {
        const doctor = await Meteor.callAsync('doctor.showByUserId', patient.doctorId)
        this.doctor.set(doctor)
        this.patient = patient
    }

    this.showSucceedMessageForTwoSecs = () => {
        this.isSucceed.set(true)
        Meteor.setTimeout(() => {
            this.isRegistered.set(true)
            this.isSucceed.set(null)
        }, 2000);
    }
});

Template.enter.events({
    'submit .tc': async function (event, template) {
        event.preventDefault()
        const tc = event.target.tc.value
        if (!tc) return
        template.tc.set(tc)

        try {
            const patient = await Meteor.callAsync('patient.showByTc', { tc })
            template.error.set(null)

            if (!patient) {
                template.isRegistered.set(false)
                template.doctor.set(null)
            } else {
                template.isRegistered.set(true)
                Meteor.call('patient.updateJoinedQueAt', patient)
                template.updateAfterAddingQue(patient)
            }
        } catch (error) {
            template.isRegistered.set(true)// bir hata varsa kayit formu kapansin

            if (error.message == "Tc failed regular expression validation [schema-error]") {
                template.error.set("Lutfen gecerli bir tc giriniz")
                console.log(error);
            } else {
                console.log(error);
            }
        }
    },

    'submit .register': async function (event, template) {
        event.preventDefault()
        const { name, surname, gender, birthYear, doctor } = event.target;

        const patient = {
            name: name.value,
            surname: surname.value,
            gender: gender.value,
            birthYear: birthYear.value,
            tc: template.tc.get(),
            doctorId: doctor.value,
        };

        try {
            await Meteor.callAsync("patient.create", patient);
            template.updateAfterAddingQue(patient);
            template.showSucceedMessageForTwoSecs();
        } catch (error) {
            console.log("catch", error);
            if (error.message == "[Tc isim uyumsuzlugu]") {
                template.error.set("Isim ve Tc uyusmamaktadir")
            } else {
                console.log(error);
            }
        }
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
        return Template.instance().doctor.get()?.profile.name
    },
    patientData: function () {
        return Template.instance().patient
    },
    isSucceed: function () {
        return Template.instance().isSucceed.get()
    },
    error: function () {
        return Template.instance().error.get()
    }
});