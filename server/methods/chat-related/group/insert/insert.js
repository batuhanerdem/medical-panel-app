new ValidatedMethod({
    name: 'group.insert',
    // mixins: [SignedInMixin],
    mixins: [],
    validate: GroupsSchema.omit("createdAt", '_id', 'members').validator(),
    async run(group) {
        const groupId = Groups.insert(group)
        return groupId
    }
});