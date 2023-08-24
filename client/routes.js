import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render("defaultLayout");
  }
});

FlowRouter.route("/login", {
  name: 'public.login',
  triggersEnter: [MustLogout],
  action: function () {
    this.render("defaultLayout", { page: "login" });
  }
});

FlowRouter.route("/doctor", {
  name: 'public.doctor',
  triggersEnter: [MustLogin],
  waitOn() {
    return Meteor.subscribe('patient.listForQue')

  },
  action: function () {
    this.render("defaultLayout", { page: "doctor" });
  }
});


FlowRouter.route("/register", {
  name: 'public.register',
  triggersEnter: [MustLogout],
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

FlowRouter.route("/chat", {
  name: 'public.chat',
  triggersEnter: [MustLogin],
  waitOn(params) {
    return [
      Meteor.subscribe('doctor.list'),
      Meteor.subscribe('groups.list')
    ]
  },
  action: function () {
    this.render("defaultLayout", { page: "chat" });

  }
})


FlowRouter.route("/chat/:chatId", {
  name: 'public.chat.chatId',
  triggersEnter: [MustLogin],
  waitOn(params) {
    return [
      Meteor.subscribe('doctor.list'),
      Meteor.subscribe('messages.list', params.chatId),
      Meteor.subscribe('groups.list')
    ]
  },
  action: function () {
    this.render("defaultLayout", { page: "chat" });
    console.log("test23");
  }
})