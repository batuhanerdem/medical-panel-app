Meteor.publish(
    'patient.listForQue', function (doctorId = Meteor.userId()) {
        const patients = Patients.find({ status: { $ne: "not-in-que" }, doctorId }, { sort: { joinedQueAt: 1 } })
        return patients
    }
)
Meteor.publish(
    'another.pub', function () {
        return Meteor.users.find({})
    }
)
