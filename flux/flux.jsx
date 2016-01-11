if (Meteor.isClient) {
  var App = React.createClass({
    render:function(){
      return(
        <div>10</div>
      );
    }
  });
  Meteor.startup(function(){
    ReactDOM.render(<App />,document.getElementById("render-target"));
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
