import SimpleSchema from 'simpl-schema'

Messages = new Mongo.Collection('messsages');

MessageSchema = new SimpleSchema({
    sendersId: {
        type: String,
        autoValue() {
            return Meteor.userId();
        }
    },
    sentAt: {
        type: Date,
        defaultValue: new Date()
    },
    groupId: String,
    text: String
});

Messages.attachSchema(MessageSchema);
