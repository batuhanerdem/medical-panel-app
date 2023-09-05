
Meteor.methods({
    'doctor.listNamesAndIds'() {
        const doctors = Meteor.users.find({}, { fields: { 'profile.name': 1 } }).fetch()
        return doctors
    }
})