var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');
var rootURL = 'https://todos-f86de.firebaseio.com/';

Firebase.initializeApp({
  apiKey: '901b34836b5e01af422a55dcdf3f996f23a257ea',
  databaseURL: 'https://todos-f86de.firebaseio.com/'
});

var Hello = React.createClass({
  mixins: [ReactFire],
  getInitialState: function(){
  return {
    items: {},
    loaded: false
  }

  },
  componentWillMount: function() {
  this.ref = Firebase.database().ref('items');
  this.bindAsArray(this.ref, 'items');
  this.ref.on('value', this.handleDataLoaded);
  },
  render: function() {
  console.log(this.state);
    return <div className="row panel panel-default">
      <div className="col-md-8 col-md-offset-2">
        <h2 className="text-center">Todo List</h2>
        <Header itemStore={this.firebaseRefs.items}/>
        <div className= {"content "+ (this.state.loaded ? 'loaded': '')}>
        <List items={this.state.items}/>
        {this.deleteButton()}
        </div>
      </div>
    </div>
  },
  deleteButton: function(){
  if(!this.state.loaded){
   return
  }
  else{

  return  <div className="text-center clear-complete">
    <button
    type="button"
    className="btn btn-default"
    onClick={this.deleteComplete}
    >
    Clear Complete
    </button>
  </div>
  }},
  deleteComplete: function(){
  console.log('I am here in delete');
    for(var key in this.state.items) {
    console.log("I am here" + key);
      if(this.state.items[key].done === true){
          this.ref.child(this.state.items[key]['.key']).remove();
      }
    }

  },
  handleDataLoaded: function() {
    this.setState({loaded: true});
  console.log('I am awesome');
  }
});

var element = React.createElement(Hello, {});
ReactDOM.render(element, document.querySelector('.container'));
