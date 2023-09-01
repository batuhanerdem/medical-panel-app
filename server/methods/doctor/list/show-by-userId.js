import SimpleSchema from "simpl-schema"

new ValidatedMethod({
    name: 'doctor.showByUserId',
    validate: new SimpleSchema({
        _id: String
    }).validator(),
    run({ _id }) {
        const doctor = Meteor.users.findOne({ _id })
        return doctor
    }
});