import SimpleSchema from 'simpl-schema'

Patients = new Mongo.Collection('patients');

PatientSchema = new SimpleSchema({
    name: String,
    surname: String,
    age: String,
    gender: {
        type: String,
        allowedValues: ["Male", "Female"]
    },
    tc: {
        type: String,
        min: 11,
        max: 11
    },
    doctorId: String
});

Patients.attachSchema(PatientSchema);
