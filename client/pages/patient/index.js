import { Meteor } from 'meteor/meteor'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.patient.onCreated(function () {
    const self = this
    self.doctors = new ReactiveVar([])
    self.patients = new ReactiveVar([])
    Meteor.call('doctor.list', (err, res) => {
        if (err) return
        console.log('res', res);
        self.doctors.set(res)
    })

})

Template.patient.onRendered(function () {
    const self = this
    const id = FlowRouter.getParam('id');
    console.log(id);
    this.autorun(function () {
        Meteor.call('patient.listByDoctorId', (id), (err, value) => {
            if (err) return
            console.log('log value', value);
            self.patients.set(value)
        })
    });
    console.log(self.patients.get());
});

Template.patient.helpers({
    doctors: function () {
        return Template.instance().doctors.get()
        // return Doctors.find({})
    }
});