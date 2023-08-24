import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


Template.chat.onCreated(function () {
    this.chatId = ReactiveVar()
});

Template.chat.onRendered(function () {
    const self = this

    const chat = {
        members: [{ name: 'mj', _id: "1231" }, { _id: Meteor.userId() }], //membersi ve isGroupu burdan alicam
        // name: "chatname"
    }
    // Meteor.call('chat.insertDirect', chat)
    // Meteor.call('chat.insertGroup', chat)


    const message = {
        text: "hello wowefsdrld", //sadece texti burdan alicam, bir de group mu degil mi bilgisini
        chatId: "grp-D2oaRW4dQNLCscwpF"
    }
    //  Meteor.call('message.create', message)
    this.autorun(function () {

    })
});


Template.chat.helpers({
    users: function () {
        const users = Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch()

        return users
    },
    groups: function () {
        const groups = Chats.find().fetch()
        console.log("groups:", groups);
        return groups
    },
    messages: function () {
        const chatId = FlowRouter.getParam('chatId');
        const messages = Messages.find({ chatId }).fetch()
        return messages
    },
    eq: function (v1, v2) {
        return v1 == v2
    },
    findSendersNameById: function (sendersId) {
        const sender = Meteor.users.findOne({ _id: sendersId })
        console.log(sender);
        return sender.username
    }
});