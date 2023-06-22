Meteor.methods({
    'patient.list'(tc) {
        return Patients.findOne({ tc })
    },
    'patient.listByDoctorId'(doctorId) {
        return Patients.find({ doctorId }).fetch()
    }
})