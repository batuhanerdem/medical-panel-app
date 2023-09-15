import SimpleSchema from 'simpl-schema'
import { Meteor } from 'meteor/meteor'

UserSchema = new SimpleSchema({
    _id: String,
    username: String,
    createdAt: {
        type: Date,
        defaultValue: new Date()
    },
    services: {
        type: Object,
        blackbox: true
    },
    profile: Object,
    'profile.tc': {
        type: String,
        min: 11,
        max: 11,
        regEx: /^[1-9]{1}[0-9]{9}[02468]{1}$/ //son hanenin cift olmasini kontrol ediyor.
    },
    'profile.name': String,
    'profile.surname': String,
    'profile.profession': String
})

Meteor.users.attachSchema(UserSchema)
