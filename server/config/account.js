Accounts.onCreateUser(function (options, user) {
    user.profile = options.profile

    const { _id, profile: { tc, name, surname } } = user;
    Doctors.insert({ userId: _id, tc, name, surname })

    // Doctors.insert({
    //     userId: user._id,
    //     tc: user.profile.tc,
    //     name: user.profile.name,
    //     surname: user.profile.surname
    // }
    return user
})