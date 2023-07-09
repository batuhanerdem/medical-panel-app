Meteor.methods({
    'doctor.showByUserId'(userId) {
        return Doctors.findOne({ userId })
    },
    'doctor.list'() {
        return Doctors.find({}).fetch()
    }
})