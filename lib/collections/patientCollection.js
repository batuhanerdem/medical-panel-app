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
    doctorId: String,
    status: {
        type: String,
        defaultValue: "in-que",
        allowedValues: ["in-que", "in-progress", "not-in-que"]
    },
    joinedQueAt: {
        type: Date,
        defaultValue: new Date()
    },
    visitCount: {
        type: Number,
        defaultValue: 0
    },
    notes: {
        type: Array,
        defaultValue: []
    },
    'notes.$': String,
});

Patients.attachSchema(PatientSchema);
