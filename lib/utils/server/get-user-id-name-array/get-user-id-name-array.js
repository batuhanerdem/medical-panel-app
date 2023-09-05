getUserIdAndNameArray = (userArray) => {
    let idAndNameArray = []
    userArray.forEach(user => {
        const myUser = {
            _id: user._id,
            name: user.profile.name
        }
        idAndNameArray.push(myUser)
    });
    return idAndNameArray
}