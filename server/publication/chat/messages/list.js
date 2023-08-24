Meteor.publish(
    'messages.list', function (chatId) {
        const messages = Messages.find({ chatId: chatId })
        return messages
    }
)