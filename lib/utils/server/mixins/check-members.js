CheckMembersMixin = function (methodOptions) {
    const runFunc = methodOptions.run

    methodOptions.run = function (_data) {

        const memberId = _data.member._id
        const groupId = _data.groupId
        const group = Groups.findOne({ _id: groupId })
        const members = group.members

        for (member of members) {
            if (member._id == memberId)
                throw new Meteor.Error("Zaten var", "Bu grupta o kullanici zaten var")
        }
        return runFunc.call(this, ...arguments)
    }

    return methodOptions
}