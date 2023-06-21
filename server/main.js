import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {
  const patient = {
    name: "deneme",
    surname: "String",
    age: 4,
    gender: "Male",
    tc: "12345678910",
    doctorId: "String"
  }
  //Patients.insert(patient)
});  