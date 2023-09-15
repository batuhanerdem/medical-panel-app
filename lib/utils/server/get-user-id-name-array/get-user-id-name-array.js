getUserIdAndNameArray = (userArray) => {
    return userArray.map(user => {
        return {
            _id: user._id,
            name: user.profile.name
        }
    });
}