Meteor.publish(
    'groups.list', function () {
        const myId = Meteor.userId()
        const groups = Groups.find({
            members: { $elemMatch: { _id: myId } }
        })
        return groups
    }
)