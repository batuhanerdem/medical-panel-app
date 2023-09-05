Meteor.publish(
    'messages.list', function (groupId) {
        const userId = Meteor.userId()
        const group = Groups.findOne({ _id: groupId })
        const members = group.members
        for (member of members) {
            if (member._id == userId) {
                const messages = Messages.find({ groupId: groupId })
                return messages
            }
        }
    }
)