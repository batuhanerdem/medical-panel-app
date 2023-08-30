new ValidatedMethod({
    name: 'message.create',
    mixins: [SignedInMixin],
    validate: MessageSchema.omit("sendersId", "sentAt").validator(),
    run(message) {
        if (!Meteor.userId()) return
        if (!checkForPermissionToChat(message.chatId)) return //mixin seklinde yaz
        Messages.insert(message)
        return true
    }
});