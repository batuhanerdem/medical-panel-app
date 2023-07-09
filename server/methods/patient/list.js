Meteor.methods({//tc kontrolu yap, validated method kullan
    'patient.showByTc'(tc) {
        return Patients.findOne({ tc })
    },
    'patient.showFirstPatient'() {
        if (!Meteor.userId()) return
        const doctorId = Meteor.userId()
        return Patients.findOne({ doctorId, status: { $ne: "not-in-que" } }, { sort: { joinedQueAt: 1 } });
    }
})