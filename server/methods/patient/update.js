Meteor.methods({
    'patient.updateJoinedQueAt'(patient) {
        const patients = Patients.update({ _id: patient._id }, { $set: { joinedQueAt: new Date(), status: "in-que" } })
        return patients
    },
    'patient.updateFirstPatient'(doctorId) {
        const patient = Patients.findOne({ status: { $ne: "not-in-que" }, doctorId }, { sort: { joinedQueAt: 1 } })
        if (!patient || patient.status == 'in-progress') return
        Patients.update(patient, { $set: { status: "in-progress" } })
        console.log("updated patient:", patient);
    },
    'patient.updateNotesAndGoNext'(patient, note) {
        if (!Meteor.userId()) return
        Patients.update({ _id: patient._id }, { $push: { notes: note }, $set: { status: "not-in-que", visitCount: patient.visitCount + 1 } })
    }
})