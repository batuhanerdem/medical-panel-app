
Template.doctor.onCreated(function () {
    this.patient = new ReactiveVar()
});

Template.doctor.onRendered(function () {
    const self = this
    this.autorun(function () {
        Patients.find({}).fetch() //burada neden fetch etmedigimde dinlemeleri alamiyorum?
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
        Meteor.call('patient.updateNotesAndGoNext', template.patient.get(), note)
        event.target.reset()
    }
});

Template.doctor.helpers({
    patient: function () {
        return Template.instance().patient.get()
    }
});
