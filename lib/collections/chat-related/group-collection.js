import SimpleSchema from 'simpl-schema'

Groups = new Mongo.Collection('groups');

GroupsSchema = new SimpleSchema({
    _id: {
        type: String,
        required: false
    },
    members: {
        type: Array,
        defaultValue: []
    },
    'members.$': {
        type: Object,
        blackbox: true //todo
    },
    // 'members.$': {
    //     type: Object
    // },
    createdAt: {
        type: Date,
        defaultValue: new Date()
    },
    name: {
        type: String,
        optional: true
    }
});

Groups.attachSchema(GroupsSchema);
