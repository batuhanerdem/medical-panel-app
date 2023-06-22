Meteor.methods({
    'doctor.listByUserId'(userId) {
        return Doctors.findOne({ userId })
    },
    'doctor.list'() {
        return Doctors.find({}).fetch()
    }
})