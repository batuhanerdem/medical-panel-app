import SimpleSchema from "simpl-schema"

new ValidatedMethod({
    name: 'patient.updateNotesAndGoNext',
    validate: new SimpleSchema({
        patient: PatientSchema,
        note: String
    }).validator(),
    run({ patient, note }) {
        console.log("hastayi yolluyorum", patient.visitCount);
        Patients.update({ _id: patient._id }, { $set: { status: "not-in-que", visitCount: patient.visitCount + 1 } })

        if (note === '') return
        Patients.update({ _id: patient._id }, { $push: { notes: note } })

        // Patients.update({ _id }, //calismiyor
        //     {
        //         $push: { notes: {$cond: [{ $ne: [note, ""] }, note, '123']}  }, // buradaki remove push islemini iptal ediyor

        //         // $set: { status: "not-in-que", visitCount: patient.visitCount + 1 }
        //     })
    }
})