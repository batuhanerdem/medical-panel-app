Meteor.publish(
    'rooms.list', function () {
        const myId = Meteor.userId()
        const rooms = Chats.find({
            members: { $elemMatch: { _id: myId } }
        })
        return rooms
    }
)