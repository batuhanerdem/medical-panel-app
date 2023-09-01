new ValidatedMethod({
    name: 'patient.create',
    validate: PatientSchema.omit("status", "joinedQueAt", "visitCount", "notes").validator(),
    async run(patient) {
        const patientObjToVerify = { tc: patient.tc, name: patient.name, surname: patient.surname, birthYear: patient.birthYear }

        const isVerifyed = (await verifyTc(patientObjToVerify) === "true")

        if (!isVerifyed) throw new Meteor.Error("Tc-isim uyumsuzlugu", "Tc ile isim uyusmamaktadir.")

        Patients.insert(patient)
        return true
    }
});
//i18n