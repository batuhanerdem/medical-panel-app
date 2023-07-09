new ValidatedMethod({
    name: 'patient.create',
    validate: PatientSchema.omit("status", "joinedQueAt", "visitCount", "notes").validator(),
    async run(patient) {
        Patients.insert(patient)
        return true
    }
});