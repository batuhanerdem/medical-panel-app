checkForPermissionToChat = (chatId) => {
    const chat = Chats.findOne({ _id: chatId })
    const members = chat.members
    const myId = Meteor.userId()

    for (member of members) {
        if (member._id == myId) return true
    }
    return false

}