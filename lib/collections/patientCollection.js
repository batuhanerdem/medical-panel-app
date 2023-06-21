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
        allowedValues: ["done", "pending", "in-progress"]
    },
    visitCount: {
        type: Number,
        optional: true, //bakilacak
    },
    // notes: {
    //     type: [String] // BU ISE YARAMIYOR, DOCSTA DA YOK
    // }
    notes: {
        type: String,
        optional: true
    }
});

Patients.attachSchema(PatientSchema);
