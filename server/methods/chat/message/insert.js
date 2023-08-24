new ValidatedMethod({
    name: 'message.create',
    mixins: [SignedInMixin],
    validate: MessageSchema.omit("sendersId", "sentAt").validator(),
    run(message) {
        if (!Meteor.userId()) return
        if (!checkForPermissionToChat(message.chatId)) return
        Messages.insert(message)
        return true
    }
});


//userlerin adlari ve idleri pub edilecek
//currentChat icinde bulundugun chati tut. frontend den gondermek icin
// signed mixin
//chatId'yi members'a gore pub et
//