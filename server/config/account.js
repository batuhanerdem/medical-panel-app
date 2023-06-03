Accounts.onCreateUser(function (options, user) {
    user.profile = options.profile

    const { _id, profile: { tc, name, surname } } = user;
    Doctors.insert({ userId: _id, tc, name, surname })

    return user
})