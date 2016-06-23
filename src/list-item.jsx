var React = require('react');
var Firebase = require('firebase');

module.exports = React.createClass({
  getInitialState: function() {
  return {
  text: this.props.item.text,
  done: this.props.item.done,
  textChanged: false
  }

  },
  componentWillMount: function() {
  this.fb = Firebase.database().ref('items/'+ this.props.item.key);

  },
  render: function() {
    return <div className="input-group">
    <span className="input-group-addon">
    <input type="checkbox"
    checked = {this.state.done}
    onChange = {this.handleDoneChange}
    />
    </span>
    <input
    type="text"
    disabled={this.state.done}
    className="form-control"
    value={this.state.text}
    onChange = {this.handleTextChange}
    />
    <span className="input-group-btn">
    {this.changesButton()}
    <button
    onClick={this.handleDeleteClick}
    className="btn btn-default">
    Delete
    </button>
    </span>
    </div>

  },
  changesButton: function() {
  if(!this.state.textChanged){
  return null
  } else{
    return [
      <button
      onClick={this.handleSaveClick}
      className="btn btn-default">Save</button>,
      <button
      onClick={this.handleUndoClick}
      className="btn btn-default">Undo</button>
    ]
    }

  },
  handleUndoClick: function(event){
    this.setState({
     text: this.props.item.text,
     textChanged: false
    })

  },
  handleSaveClick: function(event){
    this.fb.update({text: this.state.text});
    this.setState({
     textChanged: false
    });

  },
  handleDoneChange: function(event) {
  this.setState({done: event.target.checked});
  this.fb.update({done: event.target.checked});

  },
  handleDeleteClick: function(event) {

  this.fb.remove();
  },
  handleTextChange: function(event) {
  this.setState({
    text: event.target.value,
    textChanged: true

  })

  }



});
