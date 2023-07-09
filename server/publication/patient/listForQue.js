Meteor.publish(
    'patient.listForQue', function (id) {
        const patients = Patients.find({ status: { $ne: "not-in-que" }, doctorId: id }, { sort: { joinedQueAt: 1 } })
        return patients
    }
)