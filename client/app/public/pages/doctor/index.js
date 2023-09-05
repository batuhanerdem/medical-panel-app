
Template.doctor.onCreated(function () {
    this.patient = new ReactiveVar()
});

Template.doctor.onRendered(function () {
    const self = this
    this.autorun(function () {
        Patients.find({}).fetch() //dinlemek icin
        Meteor.call('patient.showFirstPatient', (err, res) => {
            if (err) return
            self.patient.set(res)
        })
    });
});

Template.doctor.events({
    'submit .add-note': function (event, template) {
        event.preventDefault()
        const note = event.target.note.value
        const patient = template.patient.get()
        Meteor.call('patient.updateNotesAndGoNext', { patient: patient, note })
        event.target.reset()
    }
});

Template.doctor.helpers({
    patient: function () {
        const patient = Template.instance().patient.get()
        return patient
    }
});
