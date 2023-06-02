import SimpleSchema from 'simpl-schema'

Patients = new Mongo.Collection('patients');

PatientSchema = new SimpleSchema({
    name: String,
    surname: String,
    age: Number,
    doctorId: String
});

Patients.attachSchema(PatientSchema);
