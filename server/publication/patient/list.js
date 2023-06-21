import { Meteor } from "meteor/meteor"

Meteor.publish("patient.list", function () {
    if (this.userId) {
        return Patients.find({ status: { $ne: "done" } })
    } else {
        return this.error() //burasi onReady'i calistiriyor, eger user yoksa neden onReady calismali
    }
})