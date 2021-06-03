import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';

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
      <div class = 'App'>
        <div id = 'display' class = 'input display'>
          <h3>{this.state.input}</h3>
        </div>
        <div class = 'btn-row'> 
          <button onClick = {this.handleClear} class = 'btn-ind-large' id =  'clear'>Clear</button>
          <button value = {'÷'} onClick = {e => this.handleOperation(e, 'value')} class = 'btn-ind-small btn-right' id = "divide">÷</button>       
         </div>
         <div class = 'btn-row'> 
          <button value = {'7'} onClick = {e => this.handleNumberInput(e, 'value')} class = 'btn-ind-small' id = "seven">7</button>
          <button value = {'8'} onClick = {e => this.handleNumberInput(e, 'value')} class = 'btn-ind-small' id = "eight">8</button>
          <button value = {'9'} onClick = {e => this.handleNumberInput(e, 'value')} class = 'btn-ind-small' id = "nine">9</button>
          <button value = {'x'} onClick = {e => this.handleOperation(e, 'value')} class = 'btn-ind-small btn-right' id = "multiply">x</button>
        </div>
        <div class = 'btn-row'> 
          <button value = {'4'} onClick = {e => this.handleNumberInput(e, 'value')} class = 'btn-ind-small' id = "four">4</button>
          <button value = {'5'} onClick = {e => this.handleNumberInput(e, 'value')} class = 'btn-ind-small' id = "five">5</button>
          <button value = {'6'} onClick = {e => this.handleNumberInput(e, 'value')} class = 'btn-ind-small' id = "six">6</button>
          <button value = {'-'} onClick = {e => this.handleOperation(e, 'value')} class = 'btn-ind-small btn-right' id = "subtract">-</button>
        </div>
        <div class = 'btn-row'> 
          <button value = {'1'} onClick = {e => this.handleNumberInput(e, 'value')} class = 'btn-ind-small' id = "one">1</button>
          <button value = {'2'} onClick = {e => this.handleNumberInput(e, 'value')} class = 'btn-ind-small' id = "two">2</button>
          <button value = {'3'} onClick = {e => this.handleNumberInput(e, 'value')} class = 'btn-ind-small' id = "three">3</button>
          <button value = {'+'} onClick = {e => this.handleOperation(e, 'value')} class = 'btn-ind-small btn-right' id = "add">+</button>
        </div>
        <div class = 'btn-row'>
          <button value = {'0'} onClick = {e => this.handleNumberInput(e, 'value')} id = "zero" class =  "btn-ind-med">0</button>
          <button value = {'.'} onClick = {e => this.handleNumberInput(e, 'value')} class = 'btn-ind-small' id = "decimal">.</button>
          <button onClick = {this.handleEquals} class = 'btn-ind-small btn-right' id = "equals">=</button>
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
      
      var k = i - countLeft + 1; //index to right of operatio
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
    for (let i = 0; i < inputCopy.length; i++) {
      var temp = '';
      if (inputCopy[i] === '+' || inputCopy[i] === '-') {
        temp = inputCopy[i];
        combine(temp, i);
        i = 0;
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
  //return true if character in bewteen the current . and the last .  is an operation  
//   if (buttonValue === '.'  && (length >= 2) && (length - 1 - input.lastIndexOf('.') < 3)) {
//    for (let i = input.lastIndexOf('.'); i < length; i++) {
//      if (input[i] !== '+' || input[i] !== 'x' || input[i] !== '-' || input[i] !== '÷') {
//        return false;
//       }
//     }
//   } return true;
// }
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals



