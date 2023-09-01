import { FlowRouter } from 'meteor/ostrio:flow-router-extra';


Template.chat.onCreated(function () {
    this.chatId = FlowRouter.getParam('chatId')
});

Template.chat.onRendered(function () {
    const self = this

    const chat = {
        members: [{ name: 'mj', _id: "1231" }, { _id: Meteor.userId() }], //membersi ve isGroupu burdan alicam
        // name: "chatname"
    }
    // Meteor.call('chat.insertDirect', chat)
    // Meteor.call('chat.insertGroup', chat)

    //  Meteor.call('message.create', message)
    this.autorun(function () {

    })
});

Template.chat.events({
    'submit form': function (event, template) {
        event.preventDefault();
        const text = event.target.text.value;
        const chatId = template.chatId
        const message = { text, chatId }
        if (!message.text == "") Meteor.call('message.create', message)
        event.target.reset()
    }
});


Template.chat.helpers({
    users: function () {
        const users = Meteor.users.find({ _id: { $ne: Meteor.userId() } }).fetch()
        return users
    },
    rooms: function () {
        const rooms = Chats.find().fetch()
        console.log("rooms:", rooms);
        return rooms
    },
    messages: function () {
        const chatId = Template.instance().chatId
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
    },
    selectedRoom: function () {
        return Template.instance()?.chatId
    }
});