import { Meteor } from 'meteor/meteor'

Template.enter.onCreated(function () {
    this.state = new ReactiveDict(null, {
        tc: null,
        doctor: null,
        patient: null,
        isRegistered: true,
    })

    Meteor.call('doctor.listNamesAndIds', (err, res) => {
        if (err) return
        this.doctors = res
    })

    this.updateAfterAddingQue = async (patient) => {
        const doctor = await Meteor.callAsync('doctor.showByUserId', { _id: patient.doctorId })
        succesfullyRegistered({ patient, doctorName: doctor.profile.name })
        this.state.set('doctor', doctor)
        this.state.set('patient', patient)
    }

});

Template.enter.events({
    'submit .tc': async function (event, template) {
        event.preventDefault()
        const tc = event.target.tc.value
        if (!tc) return
        template.state.set('tc', tc)

        try {
            const patient = await Meteor.callAsync('patient.showByTc', { tc })

            if (!patient) {
                template.state.set('isRegistered', false)
                template.state.set('doctor', null)
            } else {
                template.state.set('isRegistered', true)
                Meteor.call('patient.updateJoinedQueAt', { _id: patient._id })
                template.updateAfterAddingQue(patient)
            }
        } catch (error) {
            template.state.set('isRegistered', true)
            errorForTc(error)
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
            tc: template.state.get('tc'),
            doctorId: doctor.value,
        };

        try {
            await Meteor.callAsync("patient.create", patient);
            template.updateAfterAddingQue(patient);
            template.state.set('isRegistered', true)
        } catch (error) {
            console.log("catch", error);
            errorHandler(error)
        }
    }
});

Template.enter.helpers({
    isRegistered: function () {
        return Template.instance().state.get('isRegistered')
    },
    doctors: function () {
        return Template.instance().doctors
    },
    doctorName: function () {
        return Template.instance().state.get('doctor')?.profile.name
    },
    patientData: function () {
        return Template.instance().state.get('patient')
    }
});