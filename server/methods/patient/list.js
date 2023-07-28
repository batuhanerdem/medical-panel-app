import SimpleSchema from 'simpl-schema';

Meteor.methods({
    'patient.showFirstPatient'() {
        if (!Meteor.userId()) return
        const doctorId = Meteor.userId()
        const patient = Patients.findOne({ doctorId, status: { $ne: "not-in-que" } }, { sort: { joinedQueAt: 1 } });
        return patient
    }
})

new ValidatedMethod({
    name: 'patient.showByTc',
    validate: new SimpleSchema({
        tc: {
            type: String,
            regEx: /^[1-9]{1}[0-9]{9}[02468]{1}$/ //son hanenin cift olmasini kontrol ediyor.
        }
    }).validator(),
    run({ tc }) {
        const patient = Patients.findOne({ tc })
        return patient
    }
});