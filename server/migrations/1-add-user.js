Migrations.add({
    version: 1,
    name: 'Add users',
    up: function () {
        const users = JSON.parse(Assets.getText('seeds/users.json'))
        users.forEach(user => {
            Meteor.users.insert(user)
        });
    },
    down: function () {
        Meteor.users.remove({})
    }
});