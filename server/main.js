import { Meteor } from 'meteor/meteor';

// SimpleSchema.defineValidationErrorTransform((error) => {
//     const ddpError = new Meteor.Error('schema-error', error.message, false)
//     ddpError.details = error.details
//     return ddpError
// })


Meteor.startup(async () => {
    Migrations.migrateTo('2');
});