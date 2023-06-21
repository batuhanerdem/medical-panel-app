import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

FlowRouter.route('/', {
  name: 'public.home',
  action: function (params, queryParams) {
    // this.render('homePage');
    this.render('babis'); //SUNU DEGISTIRMEYI UNUTMA  
  }
});

FlowRouter.route("/login", {
  name: 'public.doctor',
  action: function () {
    this.render("login");
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
  action: function (params, queryparams) {
    this.render("patient");
  }
});

FlowRouter.route("/register", {
  name: 'public.register',
  action: function () {
    this.render("register")
  }
});

FlowRouter.route("/enter", {
  name: 'public.enter',
  action: function () {
    this.render("enter")
  }
})