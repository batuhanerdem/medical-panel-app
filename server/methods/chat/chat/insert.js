new ValidatedMethod({
    name: 'chat.insertDirect',
    mixins: [SignedInMixin],
    validate: ChatsSchema.omit("createdAt", "isGroup", '_id').validator(),
    async run(chat) {
        if (!Meteor.userId()) return
        chat.isGroup = false
        Chats.insert(chat)
        return true
    }
});
new ValidatedMethod({
    name: 'chat.insertGroup',
    mixins: [SignedInMixin],
    validate: ChatsSchema.omit("createdAt", "isGroup", '_id').validator(),
    async run(chat) {
        if (!Meteor.userId()) return
        if (chat.members.length < 2) throw Meteor.Error("Bir chat minimum 2 kisi olmak zorundadir")
        //1 kisi secmeden buton tiklanabilir olmasin
        chat.isGroup = true
        Chats.insert(chat)
        return true
    }
});

