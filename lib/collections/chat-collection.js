import SimpleSchema from 'simpl-schema'
import { Random } from 'meteor/random'

Chats = new Mongo.Collection('chats');

ChatsSchema = new SimpleSchema({
    _id: {
        type: String,
        autoValue() {
            let prefix
            if (this.field('isGroup').value)
                prefix = "grp-"
            else {
                prefix = 'drct-'
            }
            const _id = prefix + Random.id()
            console.log("id:", _id);
            return _id
        }
    },
    members: {
        type: Array
    },
    'members.$': {
        type: Object,
        blackbox: true //todo
    },
    createdAt: {
        type: Date,
        defaultValue: new Date()
    },
    isGroup: Boolean,
    name: {
        type: String,
        optional: true
    }
});

Chats.attachSchema(ChatsSchema);
