/*global groups,events,FlowRouter,BlazeLayout*/
/*
$(".dropdown-button").dropdown();

var schema = new SimpleSchema({
  eventName: {
    // Labels are used to reffer to this field in validation
    label: 'Name',
    // Specifying the allowed type
    type: String
  },
  conductedBy: {
    label: 'Conducted By',
    type: String
  },
  date: {
    label: 'Date',
    type: Date,
      autoform: {
      type: 'pickadate'
    }
  },
  description: {
    label:'Description',
    type: String,
    optional:true
    },
  time:{
    label:'Time',
    type:String,
    autoform: {
      afFieldInput: {
        type: "time"
      }
    }
  },

  });

events.attachSchema(schema);
*/

Template.groupPanel.helpers({
  groupData: function () {
    return groups.find().fetch();
  },
  getGroupPath:function(groupId){
    return FlowRouter.path("/community/groups/:groupid",{groupid:groupId});
  }
});

Template.eventsPanel.helpers({
  eventsData: function () {
    return events.find().fetch();
  },
  getConductor:function(a){
    return groups.findOne({_id:a}).name;
  }
});

Template.groupPageContent.helpers({
  getEvents: function () {
    return events.find({conductedBy:FlowRouter.getParam("groupid")}).fetch();
  },
  getName:function(){
    return groups.findOne({_id:FlowRouter.getParam("groupid")}).name;
  },
  getDescription:function(){
    return groups.findOne({_id:FlowRouter.getParam("groupid")}).description || "No description given";
  }
});



FlowRouter.route('/community', {
  action: function() {
    BlazeLayout.render("layout", {content: "communityPageContent",breadcrumbs:"communityPageBreadcrumb"});
  }
});
FlowRouter.route('/', {
  action: function() {
    FlowRouter.go("/community");
  }
});
FlowRouter.route('/groups', {
  action: function() {
    FlowRouter.go("/community");
  }
});

FlowRouter.route('/community/groups/:groupid', {
  name:"group",
  action: function() {
    BlazeLayout.render("layout", {content: "groupPageContent",breadcrumbs:"groupPageBreadcrumb"});
  }
});
