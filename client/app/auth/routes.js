import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route("/login", {
    name: 'auth.login',
    triggersEnter: [MustLogout],
    action: function () {
        this.render("defaultLayout", { page: "login" });
    }
});

FlowRouter.route("/register", {
    name: 'auth.register',
    triggersEnter: [MustLogout],
    action: function () {
        this.render("defaultLayout", { page: "register" });
    }
});
