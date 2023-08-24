Meteor.methods({
    'doctor.showByUserId'(_id) {
        const doctor = Meteor.users.findOne({ _id })
        return doctor
    },
    'doctor.listNamesAndIds'() {
        const doctors = Meteor.users.find({}).fetch()
        const doctorDict = []
        for (doctor of doctors) {
            const dictObj = { id: doctor._id, name: doctor.profile.name }
            doctorDict.push(dictObj)
        }
        return doctorDict
    }
})