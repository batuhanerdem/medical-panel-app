Meteor.methods({
    'patient.showFirstPatient'() {
        if (!Meteor.userId()) return
        const doctorId = Meteor.userId()
        const patient = Patients.findOne({ doctorId, status: { $ne: "not-in-que" } }, { sort: { joinedQueAt: 1 } });
        return patient
    }
})
