import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

//callara tekrar bak
//isimlendirme
//collectionsa default deger
//publish limit
//UI

MustLogin = function (context, redirect, _) {
    if (!Meteor.userId()) {
        redirect("login")
    }
}

MustLogout = function () {
    if (Meteor.userId()) {
        Meteor.logout()
    }
}