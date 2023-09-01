MustLogout = function (context, redirect, stop) {
    if (Meteor.userId()) {
        Meteor.logout() // simdilik sadece cikis yapiyor
        // todo
    }
}