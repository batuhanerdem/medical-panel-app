new ValidatedMethod({
    name: 'patient.create',
    validate: PatientSchema.omit("status", "joinedQueAt").validator(),
    async run(patient) {
        patient.status = "not-in-que"
        patient.joinedQueAt = new Date()
        Patients.insert(patient)
        return true
    }
});