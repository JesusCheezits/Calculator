import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';


class Calc extends React.Component {
  constructor(props) {
    super(props);
     this.state = {
          input:['0']
        }  
    this.handleNumberInput = this.handleNumberInput.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleOperation = this.handleOperation.bind(this);
    this.handleEquals = this.handleEquals.bind(this);
    
  }
  handleNumberInput(e) {
    var length = this.state.input.length;
    const buttonValue = e.target.value;
    if(buttonValue === '.' && length >= 2) {
      if(decimalCheck(this.state.input, length)) {
          this.setState((state) => ({
            input: state.input.concat(buttonValue)
          }));
        }
       } else if (this.state.input[0] === '0' && length === 1 && buttonValue !== '.') {
          this.setState((state) => ({
            input: [buttonValue]
          }));
        } else {
        this.setState((state) => ({
          input: state.input.concat(buttonValue) 
        }));
      }
  }
    
  handleClear() {
    this.setState({
      input: ['0']
    });
  }
  handleOperation(e) {
    //bold pressed button
    const buttonValue = e.target.value;
    var temp = this.state.input[this.state.input.length - 1];
    if (temp === '.') return;
    if (temp === 'x'|| temp === '-'|| temp === '+'|| temp === '÷') {
      var res = [...this.state.input.slice(0, this.state.input.length - 1)]; 
      this.setState((state) => ({
          input: res
      }));
    }
    this.setState((state) => ({
        input: state.input.concat(buttonValue)
    }));
  }
  handleEquals() {
      this.setState((state) => ({
        input: calculate(this.state.input)
      }));
  }
  render() {
    return (
      <div className = 'App'>
        <div className = 'display input'>
          <h3>{this.state.input}</h3>
          {console.log(this.state.input)}
          {console.log(this.state.input.lastIndexOf('.'))}
        </div>
        <div> 
          <button style={{fontSize: 20}} onClick = {this.handleClear} className = 'btn-ind-large clear'>Clear</button>
          <button style={{fontSize: 20}} value = {'÷'} onClick = {e => this.handleOperation(e, 'value')}className = "divide btn-ind-small btn-right">÷</button>       
         </div>
         <div> 
          <button style={{fontSize: 20}} value = {'7'} onClick = {e => this.handleNumberInput(e, 'value')} className = "seven btn-ind-small">7</button>
          <button style={{fontSize: 20}}value = {'8'} onClick = {e => this.handleNumberInput(e, 'value')} className = "eight btn-ind-small">8</button>
          <button style={{fontSize: 20}}value = {'9'} onClick = {e => this.handleNumberInput(e, 'value')} className = "nine btn-ind-small">9</button>
          <button style={{fontSize: 20}}value = {'x'} onClick = {e => this.handleOperation(e, 'value')} className = "multiply btn-ind-small btn-right">x</button>
        </div>
        <div> 
          <button style={{fontSize: 20}} value = {'4'} onClick = {e => this.handleNumberInput(e, 'value')} className = "four  btn-ind-small">4</button>
          <button style={{fontSize: 20}} value = {'5'} onClick = {e => this.handleNumberInput(e, 'value')} className = "five  btn-ind-small">5</button>
          <button style={{fontSize: 20}} value = {'6'} onClick = {e => this.handleNumberInput(e, 'value')} className = "six  btn-ind-small">6</button>
          <button style={{fontSize: 20}} value = {'-'} onClick = {e => this.handleOperation(e, 'value')}className = "subtract  btn-ind-small btn-right">-</button>
        </div>
        <div> 
          <button style={{fontSize: 20}} value = {'1'} onClick = {e => this.handleNumberInput(e, 'value')} className = "one btn-ind-small">1</button>
          <button style={{fontSize: 20}} value = {'2'} onClick = {e => this.handleNumberInput(e, 'value')} className = "two btn-ind-small">2</button>
          <button style={{fontSize: 20}} value = {'3'} onClick = {e => this.handleNumberInput(e, 'value')} className = "three btn-ind-small">3</button>
          <button style={{fontSize: 20}} value = {'+'} onClick = {e => this.handleOperation(e, 'value')}className = "add btn-ind-small btn-right">+</button>
        </div>
        <div>
          <button style={{fontSize: 20}} value = {'0'} onClick = {e => this.handleNumberInput(e, 'value')} className = "zero btn-ind-med">0</button>
          <button style={{fontSize: 20}} value = {'.'} onClick = {e => this.handleNumberInput(e, 'value')} className = "decimal btn-ind-small">.</button>
          <button style={{fontSize: 20}} onClick = {this.handleEquals} className = "equals btn-ind-small btn-right">=</button>
          </div> 
      </div>

    );
  }
}

ReactDOM.render(
    <Calc />,
  document.getElementById('root')
);

const calculate = function(input) {
  let inputCopy = [...input]; 
  let length = inputCopy.length;
  const combine = function(operation, i) { 
   var tempLeftArray = [];
      let tempLeftJoin = '';
      let tempRightArray = [];
      let tempRightJoin = '';
      let countLeft = 0;
      var j = i - 1; //index to left of operation
      while (j >= 0) {
        if (inputCopy[j] === 'x' || inputCopy[j] === '+' || inputCopy[j] === '-' || input[j] === '÷' ) {
              break;
        }
        tempLeftArray.unshift(inputCopy[j]); 
            inputCopy.splice(j, 1);
            j--;
            countLeft++;
      }
      var k = i - countLeft + 1; //index to right of operation
      while (k < length) {
        if (inputCopy[k] === 'x' || inputCopy[k] === '+' || inputCopy[k] === '-' || inputCopy[k] === '÷' ) {
          break;
        }
         tempRightArray.push(inputCopy[k]);
         k++;
      } 
      while (k > i - countLeft + 1) {
        inputCopy.splice(i - countLeft + 1, 1);
        k--;
      }
      tempLeftJoin = tempLeftArray.join(''); 
      tempRightJoin = tempRightArray.join('');
      switch (operation) {
        case 'x':
          inputCopy.splice(i - countLeft, 1, (parseFloat(tempLeftJoin) * parseFloat(tempRightJoin)));
          break;
        case '÷':
          inputCopy.splice(i - countLeft, 1, (parseFloat(tempLeftJoin) / parseFloat(tempRightJoin)));
          break;
        case '+':
          inputCopy.splice(i - countLeft, 1, (parseFloat(tempLeftJoin) + parseFloat(tempRightJoin)));
          break;
        case '-':
          inputCopy.splice(i - countLeft, 1, (parseFloat(tempLeftJoin) - parseFloat(tempRightJoin)));
          break;
        default:
          break;
        }
      tempLeftArray = [];
      tempRightArray = [];
      countLeft = 0;
} 
    for (let i = 0; i <length; i++) {
      if (inputCopy[i] === 'x') {
        combine('x', i);
      }
      if (inputCopy[i] === '÷') {
        combine('÷', i);
      }
    }
    for (let i = 0; i <length; i++) {
      if (inputCopy[i] === '+') {
        combine('+', i);
      }
    }
    for (let i = 0; i < length; i ++) {
      if (inputCopy[i] === '-') {
        combine('-', i);
      }
    }
    return inputCopy;
}
const decimalCheck = function(input, length) {

  if(!input.includes('.')) {
    return true;
  }
  for (let i = input.lastIndexOf('.'); i < length; i++) {
    if((input[i] === '+' || input[i] === '-' || input[i] === 'x' || input[i] === '÷')) {
      return true;
    }
  }
} 
  
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
