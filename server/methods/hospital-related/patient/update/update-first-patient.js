import SimpleSchema from "simpl-schema"

new ValidatedMethod({
    name: 'patient.updateFirstPatient',
    validate: new SimpleSchema({
        doctorId: {
            type: String,
            required: false
        }
    }).validator(),
    run({ doctorId }) {
        if (!doctorId) return
        const patient = Patients.findOne({ status: { $ne: "not-in-que" }, doctorId }, { sort: { joinedQueAt: 1 } })
        if (!patient || patient.status == 'in-progress') return
        Patients.update(patient, { $set: { status: "in-progress" } })
        console.log("updated patient:", patient);
    }
})

