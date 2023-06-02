import SimpleSchema from 'simpl-schema'

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