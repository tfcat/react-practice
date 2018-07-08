import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

class InputBox extends React.Component {
  render() {
    return(
      <input 
        type="text"
        value={this.props.value}
        onChange={(evt) => {this.props.handleChange(evt)}} 
      />
    );
  }

}

class Main extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tuples: [],
      inpValue: ""
    };
  }

  setInpValue(value) {
    this.setState({inpValue: value});
  }

  renderNewButton() {
    return(
      <button onClick = {()=>{this.addNewTuple()}}>
      New</button>
    );
  }

  renderInputBox() {
    return (
      <InputBox
        value = {this.state.inpValue}
        handleChange = {(evt) => {this.updateInputValue(evt)}}
        changeVal = {(test) => {this.setInpValue(test)}}
      />
    );
  }
  
  updateInputValue(evt) {
    this.setState({inpValue: evt.target.value});
  }

  addNewTuple() {
    const inpVal = this.state.inpValue;
    if(inpVal !== ""){
      var newTuples = this.state.tuples.slice();
      newTuples.push({title: inpVal})

      // Insert into Database
      this.clearBox();
      this.setState({
        tuples: newTuples
      });
    }
  }

  clearBox() {
    this.setState({inpValue: ""});
  }

  renderTuple(i) {
    return (
      <div key={i}>&gt; {this.state.tuples[i].title} <button onClick={() => {this.removeTuple(i)}}>x</button></div>
    );
  }

  renderAllTuples() {
    var tuple_list = [];
    for (var i = 0; i < this.state.tuples.length; i++) {
      tuple_list.push(this.renderTuple(i));
    }
    return tuple_list;
  }

  removeTuple(index) {
      var tuple_list = this.state.tuples.slice();
      tuple_list.splice(index,1);
      this.setState({tuples: tuple_list})
  }

  render() {
    return (
      <div>
        {this.renderNewButton()}
        {this.renderInputBox()}
        {this.renderAllTuples()}
      </div>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('root')
);
