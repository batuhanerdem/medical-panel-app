import PROFESSIONS from "../../lib/utils/enums/profession-enums";
Migrations.add({
    version: 2,
    name: 'Add groups',
    up: function () {

        const allUsers = Meteor.users.find({}).fetch()
        const usersIdAndNames = getUserIdAndNameArray(allUsers)
        const groupObj = {
            name: 'Genel',
            members: usersIdAndNames
        }
        Groups.insert(groupObj)

        const professions = Object.values(PROFESSIONS)
        professions.forEach((profession) => {
            const users = Meteor.users.find({ 'profile.profession': profession }).fetch()
            const usersIdAndNames = getUserIdAndNameArray(users)

            const groupObj = {
                members: usersIdAndNames,
                name: profession
            }
            Groups.insert(groupObj)
        })

    },
    down: function () {
        Groups.remove({})
    }
});