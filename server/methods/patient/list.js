Meteor.methods({
    'patient.listByTc'(tc) {
        return Patients.findOne({ tc })
    },
    'patient.listByDoctorId'(doctorId) {
        const patients = Patients.find({ doctorId }, { sort: { joinedQueAt: 1 } }).fetch()
        const a = Patients.update({ doctorId }, { $set: { status: "not-in-que" } }, { multi: true })
        console.log(Patients.find({ doctorId }).fetch());
        console.log("a:", a);
        // Patients.update(patients[0], { $set: { status: "in-progress" } })
        return patients
    },
    'patient.listFirstPatient'() {
        if (!Meteor.userId()) return
        const doctorId = Meteor.userId()
        return Patients.findOne({ doctorId, status: { $ne: "not-in-que" } }, { sort: { joinedQueAt: 1 } });
    }
})