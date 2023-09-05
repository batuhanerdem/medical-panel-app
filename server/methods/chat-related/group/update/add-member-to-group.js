import SimpleSchema from "simpl-schema";

new ValidatedMethod({
    name: 'group.addMember',
    mixins: [CheckMembersMixin],
    validate: new SimpleSchema({
        groupId: String,
        member: {
            type: UserSchema
        }
    }).validator(),
    async run({ groupId, member }) {
        const memberObject = {
            _id: member._id,
            name: member.profile.name
        }
        Groups.update({ _id: groupId }, { $push: { members: memberObject } })
        return true
    }
});