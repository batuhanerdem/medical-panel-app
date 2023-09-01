MustLogin = function (context, redirect, stop) {
    if (!Meteor.userId()) {
        redirect(`/login?redirect=${context.path}`)
        stop() //stopu oku
    }
}