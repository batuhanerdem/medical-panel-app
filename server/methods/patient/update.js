Meteor.methods({
    'patient.updateJoinedQueAt'(patient) {
        Patients.update({ _id: patient._id }, { $set: { joinedQueAt: new Date() } })
    },
    'patient.updateStatus'(patient, status) {
        console.log(patient._id, status);
        Patients.update({ _id: patient._id }, { $set: { status: status } })
    }
})