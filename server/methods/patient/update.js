Meteor.methods({
    'patient.updateJoinedQueAt'(patient) {
        console.log(Patients.update({ _id: patient._id }, { $set: { joinedQueAt: new Date() }, $set: { status: "in-que" } }))
    },
    'patient.updateFirstPatient'(id) {
        const patients = Patients.find({ status: { $ne: "not-in-que" }, doctorId: id }, { sort: { joinedQueAt: 1 } })
        const firstPatient = patients.fetch()[0]
        Patients.update(firstPatient, { $set: { status: "in-progress" } })
    },
    'patient.updateNotesAndGoNext'(patient, note) {
        if (!Meteor.userId()) return
        console.log(patient.name);
        console.log(Patients.update({ _id: patient._id }, { $push: { notes: note }, $set: { status: "not-in-que", visitCount: 1 } }))
    }
})