new ValidatedMethod({
    name: 'patient.create',
    validate: PatientSchema.omit("status", "joinedQueAt", "visitCount", "notes").validator(),
    async run(patient) {
        patient.status = "in-que"
        patient.joinedQueAt = new Date()
        patient.notes = []
        patient.visitCount = 0
        Patients.insert(patient)
        return true
    }
});