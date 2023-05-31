import SimpleSchema from 'simpl-schema'
import { Meteor } from 'meteor/meteor'

userSchema = new SimpleSchema({
    _id: {
        type: String,
        optional: true
    },
    username: String,
    // createdAt: Date,
    // password: String,
    services: {
        type: Object,
        blackbox: true
    },
    profile: {
        type: Object,
        optional: true,
        blackbox: true
    }
    // profile: {
    //     type: Object,
    //     optional: false
    // },
    // 'profile.tc': {
    //     type: String,
    //     min: 11,
    //     max: 11
    // },
    // 'profile.name': String,
    // 'profile.surname': String,
    // 'profile.createdAt': Date,

})

//Meteor.users.attachSchema(userSchema)
