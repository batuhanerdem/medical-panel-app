Meteor.methods({
    'doctor.showByUserId'(_id) {
        const doctor = Meteor.users.findOne({ _id })
        return doctor
    },
    'doctor.listNamesAndIds'() {
        const doctors = Meteor.users.find({}).fetch()
        const doctorDict = []
        for (number in doctors) {
            currentDoctor = doctors[number]
            const dict = { id: currentDoctor._id, name: currentDoctor.profile.name }
            doctorDict.push(dict)
        }
        return doctorDict
    }
})