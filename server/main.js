import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {

  patientObject = {
    name: "hastayim",
    id: 1,
    surname: "hasta",
    Age: 23,
    Doctor: "ferhat gocer",
  }
  //Patients.insert(patientObject);


  const patients = [{ name: "hasta2" }, { name: "Hasta3" }]
  const user = {
    _id: "asdas1dsgrgtbzxvsga",
    username: "batuhan",
    password: "erdem",
    createdAt: new Date(),
    profile: {
      tc: 12345678912,
      name: "Batuhan",
      surname: "Erdem",
      patients: patients
    }
  }
  // if (!Meteor.users.findOne({ username: user.username })) {
  //   Accounts.createUser(user);
  // } else {
  //   console.log("varmis");
  // }
});  