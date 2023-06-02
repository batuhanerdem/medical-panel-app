import SimpleSchema from 'simpl-schema'
import { Meteor } from 'meteor/meteor'

userSchema = new SimpleSchema({
    _id: String,
    username: String,
    createdAt: Date,
    services: {
        type: Object,
        blackbox: true
    },
    profile: Object,
    'profile.tc': {
        type: String,
        min: 11,
        max: 11
    },
    'profile.name': String,
    'profile.surname': String,
    'profile.createdAt': Date
})

Meteor.users.attachSchema(userSchema)
