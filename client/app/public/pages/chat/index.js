import { FlowRouter } from 'meteor/ostrio:flow-router-extra';

Template.chat.onCreated(async function () {
    this.groupId = FlowRouter.getParam('groupId')
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
        return groups
    },
    messages: function () {
        const groupId = Template.instance().groupId
        const messages = Messages.find({ groupId }).fetch()
        return messages
    },
    findSendersNameById: function (sendersId) {
        const sender = Meteor.users.findOne({ _id: sendersId })
        return sender?.profile.name
    },
    selectedGroupId: function () {
        const selectedGroupId = Template.instance().groupId
        return selectedGroupId
    },
    memberNames: function () {
        const groupId = Template.instance().groupId
        const group = Groups.findOne({ _id: groupId })
        const members = group?.members
        let memberNames = []
        members?.forEach(member => {
            memberNames.push(member.profile.name)
        });
        return memberNames
    }
});