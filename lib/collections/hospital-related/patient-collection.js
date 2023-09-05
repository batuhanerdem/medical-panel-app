import SimpleSchema from 'simpl-schema'

Patients = new Mongo.Collection('patients');

PatientSchema = new SimpleSchema({
    _id: {
        type: String,
        required: false
    },
    name: String,
    surname: String,
    birthYear: String,
    gender: {
        type: String,
        allowedValues: ["Erkek", "Kadın"]
    },
    tc: {
        type: String,
        regEx: /^[1-9]{1}[0-9]{9}[02468]{1}$/ //son hanenin cift olmasini kontrol ediyor.
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
        //     autoValue() {
        //         if (!this.isSet) {
        //             return 0
        //         }
        //     }
    },
    notes: {
        type: Array,
        defaultValue: []
    },
    'notes.$': String,
});

Patients.attachSchema(PatientSchema);
