import SimpleSchema from 'simpl-schema'

Counts = new Mongo.Collection('counts');

CountsSchema = new SimpleSchema({
    key: String,
    status: {
        type: String,
        allowedValues: ["inc", "dec"]
    },
})