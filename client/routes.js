import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    this.render('homePage');
  }
});

FlowRouter.route("/doctor", {
  name: 'public.doctor',
  action: function () {
    this.render("doctor");
  }
});

FlowRouter.route("/patient", {
  name: 'public.patient',
  action: function () {
    this.render("patient");
  }
});

FlowRouter.route("/register", {
  name: 'public.register',
  action: function () {
    this.render("register")
  }
})