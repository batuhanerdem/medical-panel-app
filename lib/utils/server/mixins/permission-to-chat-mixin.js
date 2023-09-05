PermissionToChatMixin = function (methodOptions) {
    const runFunc = methodOptions.run
    methodOptions.run = function (_data) {
        const groupId = _data.groupId
        const group = Groups.findOne({ _id: groupId })

        const members = group.members
        const userId = this.userId

        for (member of members) {
            if (member._id == userId) {
                return runFunc.call(this, ...arguments)
            }
        }
        throw new Meteor.Error("Izniniz yok", "Bu gruba mesaj gonderme izniniz yok")
    }
    return methodOptions
}