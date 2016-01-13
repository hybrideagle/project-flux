//injectTapEventPlugin();
//groupList = new Mongo.Collection("groupList");

var { Card, CardTitle, CardActions, FlatButton, CardText, AppBar, Paper } = mui;


var GroupsPanel = React.createClass({
  mixins:[ReactMeteorData],

  getMeteorData:function(){
    return {
      groups:groupList.find().fetch()
    };
  },

  getTileElements:function(){
    this.data.groups.map(tile => <GridTile
    key={tile.img}
    title={tile.title}
    actionIcon={<IconButton><StarBorder color="white"/></IconButton>}
    actionPosition="left"
    titlePosition="top"
    titleBackground={gradientBg}
    cols={tile.featured ? 2 : 1}
    rows={tile.featured ? 2 : 1}
    ><img src={tile.img} /></GridTile>);
  },

  render:function(){
    <Paper zDepth={2}>
    <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'}}>
      <GridList
        cols={2}
        cellHeight={200}
        padding={1}
        >
        {this.getTileElements()}
      </GridList>
    </div>
    </Paper>
  }
});


var App = React.createClass({
  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  getInitialState() {
    let ThemeManager = mui.Styles.ThemeManager

    let DefaultRawTheme = mui.Styles.LightRawTheme

    return {
      hovered: false,
      isKeyboardFocused: false,
      touch: false,
      muiTheme: this.context.muiTheme ? this.context.muiTheme : ThemeManager.getMuiTheme(DefaultRawTheme),
    };
  },

  getMeteorData() {
    return {
      count: Session.get('count')
    }
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  //for passing default theme context to children
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getChildContext () {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  render: function() {
    return (
      <Paper zDepth={1}>
      <AppBar title="flux" />
        <GroupsPanel />

      </Paper>
        );
  }
});


Meteor.startup(function () {
  ReactDOM.render(<App />, document.getElementById("render-target"));
});
