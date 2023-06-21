new ValidatedMethod({
    name: 'patient.create',
    validate: PatientSchema.omit("status").validator(),
    async run(patient) {
        patient.status = "pending"
        Patients.insert(patient)
        return patient.doctorId
    }
});