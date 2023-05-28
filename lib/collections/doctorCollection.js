import SimpleSchema from 'simpl-schema'
import { Accounts } from 'meteor/accounts-base'

Doctors = new Mongo.Collection('doctors');

DoctorSchema = new SimpleSchema({
    userId: String,
    tc: {
        type: String,
        min: 11,
        max: 12
    },
    name: String,
    surname: String
});

Doctors.attachSchema(DoctorSchema);






// PatientSchema'yi gormuyodu, calismasi acisindan buraya aldim - sorulacak


// PatientSchema = new SimpleSchema({
//     id: Number,
//     name: String,
//     surname: String,
//     Age: Number,
//     Doctor: String
// });


// Schema for account package

// UserSchema = new SimpleSchema({
//     _id: String,
//     username: String,
//     createdAt: Date,
//     profile: Object,
//     'profile.tc': {
//         type: Number,
//         min: 11,
//         max: 11
//     },
//     'profile.name': String,
//     'profile.surname': String,
//     'profile.patients': PatientSchema
// })

//Meteor.users.attachSchema(UserSchema)