new ValidatedMethod({
    name: 'patient.create',
    validate: PatientSchema.omit("status", "joinedQueAt", "visitCount", "notes").validator(),
    async run(patient) {
        const patientObjForVerify = { tc: patient.tc, name: patient.name, surname: patient.surname, birthYear: patient.birthYear }

        const isVerifyed = (await verifyTc(patientObjForVerify) === "true")

        if (!isVerifyed) throw new Meteor.Error("Tc isim uyumsuzlugu")

        //Patients.insert(patient)
        console.log("kayit edildi");
        return true
    }
});
//i18n