import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base'
import SimpleSchema from 'simpl-schema'

SimpleSchema.defineValidationErrorTransform((error) => {
    const ddpError = new Meteor.Error('schema-error', error.message, false)
    ddpError.details = error.details
    return ddpError
})


Meteor.startup(() => { });