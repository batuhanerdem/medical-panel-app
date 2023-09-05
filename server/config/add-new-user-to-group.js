Accounts.onCreateUser(function (options, user) {
    user.profile = options.profile

    // console.log('options:', options);
    // console.log('user:', user);
    // Meteor.call('group.addMember', { groupId: GENERAL_GROUP_ID, member: user })
    //todo
    addUserByProfession(user)

    // return user
})

const GENERAL_GROUP_ID = 'Cbsku77SoAGg6PFf5'