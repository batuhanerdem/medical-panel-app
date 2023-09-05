import SimpleSchema from "simpl-schema"

new ValidatedMethod({
    name: 'patient.updateJoinedQueAt',
    validate: new SimpleSchema({
        _id: String
    }).validator(),
    run({ _id }) {
        const patient = Patients.update({ _id }, { $set: { joinedQueAt: new Date(), status: "in-que" } })
        return patient
    }
})
