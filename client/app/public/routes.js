import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render("defaultLayout");
  }
});

FlowRouter.route("/doctor", {
  name: 'public.doctor',
  triggersEnter: [MustLogin],
  waitOn: function (params) {
    return Meteor.subscribe('patient.listForQue')
  },
  action: function () {
    this.render("defaultLayout", { page: "doctor" });
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
  waitOn: function (params) {
    return Meteor.subscribe('patient.listForQue', params.id)
  },
  action: function () {
    this.render("defaultLayout", { page: "patient" });
  }
});

FlowRouter.route("/chat", {
  name: 'public.chat',
  triggersEnter: [MustLogin],
  waitOn: function (params) {
    return [
      Meteor.subscribe('doctor.list'),
      Meteor.subscribe('groups.list')
    ]
  },
  action: function () {
    this.render("defaultLayout", { page: "chat" });
  }
})

FlowRouter.route("/chat/:groupId", {
  name: 'public.chat.groupId',
  triggersEnter: [MustLogin],
  waitOn: function (params) {
    return [
      Meteor.subscribe('doctor.list'),
      Meteor.subscribe('messages.list', params.groupId),
      Meteor.subscribe('groups.list')
    ]
  },
  action: function () {
    this.render("defaultLayout", { page: "chat" });
  }
})
