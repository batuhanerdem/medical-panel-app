Meteor.publish(
    'messages.list', function (groupId) {
        const messages = Messages.find({ groupId: groupId })
        return messages
    }
)