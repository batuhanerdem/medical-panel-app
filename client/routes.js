import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render("defaultLayout", { page: "login" });
  }
});

FlowRouter.route("/login", {
  name: 'public.doctor',
  triggersEnter: [MustLogout],
  action: function () {
    this.render("defaultLayout", { page: "login" });
  }
});

FlowRouter.route("/doctor", {
  name: 'public.doctor',
  triggersEnter: [MustLogin],
  waitOn() {
    return Meteor.subscribe('patient.listForQue', Meteor.userId())
  },
  action: function () {
    this.render("defaultLayout", { page: "doctor" });
  }
});

FlowRouter.route("/patient", {
  name: 'public.patient',
  action: function () {
    this.render("defaultLayout", { page: "patient" });
  }
});

FlowRouter.route("/patient/:id", {
  name: 'public.patient.id',
  waitOn(params) {
    return Meteor.subscribe('patient.listForQue', params.id)
  },
  action: function () {
    this.render("defaultLayout", { page: "patient" });
  }
});

FlowRouter.route("/register", {
  name: 'public.register',
  action: function () {
    this.render("defaultLayout", { page: "register" });
  }
});

FlowRouter.route("/enter", {
  name: 'public.enter',
  action: function () {
    this.render("defaultLayout", { page: "enter" });
  }
})