/*global groups,events*/
groups = new Mongo.Collection("groups");
events = new Mongo.Collection("events");
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.groupPanel.helpers({
    groupData: function () {
      return groups.find().fetch();
    }
  });
  Template.eventsPanel.helpers({
    eventsData: function () {
      return events.find().fetch();
    }
  });
  
  FlowRouter.route('/', {
    action: function() {
      BlazeLayout.render("mainLayout", {content: "mainPage"});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
