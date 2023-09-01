import SimpleSchema from 'simpl-schema';

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