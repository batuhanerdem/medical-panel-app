import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


//middleware ekle, giris yapilmadiysa giremesin

Template.doctor.events({
    'click .btn-register': function (event, template) {
        FlowRouter.go("register")
    },
    'submit form': async function (event, template) {
        event.preventDefault()
        const t = event.target

        const name = t.name.value
        const surname = t.surname.value
        const tc = t.tc.value
        const gender = t.gender.value
        const age = t.age.value

        const user = { name, surname, gender, age, tc }

        const doctorId = await Meteor.callAsync("patient.create", user)
    }
}); 
