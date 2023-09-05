Accounts.onCreateUser(function (options, user) {
    user.profile = options.profile
    const profession = user.profile.profession
    const userObj = {
        _id: user._id,
        name: user.profile.name
    }
    Groups.update({ name: profession }, { $push: { members: userObj } })
    Groups.update({ name: 'Genel' }, { $push: { members: userObj } })
    return user
})