Meteor.methods({
    'patient.list'(tc) {
        return Patients.findOne({ tc })
    },
    'patient.listByDoctorId'(doctorId) {
        return Patients.find({ doctorId }, { sort: { joinedQueAt: -1 } }).fetch()
    }
})