new ValidatedMethod({
    name: 'message.create',
    mixins: [SignedInMixin, PermissionToChatMixin],
    validate: MessageSchema.omit("sendersId", "sentAt").validator(),
    run(message) {
        Messages.insert(message)
        return true
    }
});