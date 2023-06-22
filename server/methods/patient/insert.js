new ValidatedMethod({
    name: 'patient.create',
    validate: PatientSchema.omit("status").validator(),
    async run(patient) {
        patient.status = "not-here"
        Patients.insert(patient)
        return true
    }
});