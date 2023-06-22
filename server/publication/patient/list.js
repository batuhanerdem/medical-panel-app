import { Meteor } from "meteor/meteor"

Meteor.publish("patient.list", function () {
    if (this.userId) {
        return Patients.find({})
        // return Patients.find({ status: { $ne: "not-here" } })
    } else {
        return this.ready() //burasi onReady'i calistiriyor, eger user yoksa neden onReady calismali
    }
})