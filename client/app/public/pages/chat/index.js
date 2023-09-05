import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


Template.chat.onCreated(async function () {
    this.groupId = FlowRouter.getParam('groupId')
    console.log(this.groupId);
    const user = await Meteor.user()
    console.log(user);
    const grp = {
        members: [{ _id: Meteor.userId(), name: await Meteor.user().profile.name }],
        name: 'deneme'
    }
    // Meteor.call('group.insert', grp)
});

Template.chat.events({
    'submit form': function (event, template) {
        event.preventDefault();
        const text = event.target.text.value;
        const groupId = template.groupId
        const message = { text, groupId }
        if (!message.text == "") Meteor.call('message.create', message)
        event.target.reset()
    }
});


Template.chat.helpers({
    users: function () {
        const users = Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch()
        return users
    },
    groups: function () {
        const groups = Groups.find().fetch()
        console.log("groups:", groups);
        return groups
    },
    messages: function () {
        const groupId = Template.instance().groupId
        const messages = Messages.find({ groupId }).fetch()
        return messages
    },
    eq: function (v1, v2) {
        return v1 == v2
    },
    findSendersNameById: function (sendersId) {
        const sender = Meteor.users.findOne({ _id: sendersId })
        console.log(sender);
        return sender.profile.name
    },
    selectedGroupId: function () {
        const selectedGroupId = Template.instance().groupId
        return selectedGroupId
    }
});