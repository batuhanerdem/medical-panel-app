import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


MustLogin = function (context, redirect, stop) {
    if (!Meteor.userId()) {
        redirect(`/login?redirect=${context.path}`)
        stop() //stopu oku
    }
}

MustLogout = function (context, redirect, stop) {
    if (Meteor.userId()) {
        Meteor.logout() // simdilik sadece cikis yapiyor
        // todo
    }
}