Meteor.publish(
    'doctor.list', function () {
        const doctors = Meteor.users.find({}, { fields: { 'profile.name': 1 } })
        return doctors
    }
)