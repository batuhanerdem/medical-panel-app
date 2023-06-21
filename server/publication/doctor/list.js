import { Meteor } from 'meteor/meteor'

Meteor.publish("doctor.list", function () {

    return Doctors.find({})
})