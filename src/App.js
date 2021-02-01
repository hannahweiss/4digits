import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [secret, setSecret] = useState(1234)
  // TODO: should guesses be a set? can a user do the same guess twice in one game
  const [guesses, setGuesses] = useState([])
  const [text, setText] = useState("")

  function guess(ev) {
    let valid_guess = validateGuess(text);
    if (valid_guess){
      let ng = guesses.concat(text);
      // console.log(validateGuess(text));
      setText("");
      console.log("ng", ng);
      setGuesses(ng);
    }
    else {
      console.log("invalid guess");
    }
  }

  function validateGuess(guess){
    let valid_guess_digit = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
    let used_digits = new Set();
    if(guess.length == 4){
      for (let i = 0; i < guess.length; i++) {
        if (valid_guess_digit.has(guess[i]) && !(used_digits.has(guess[i]))){
          used_digits.add(guess[i]);
        }
        else {
          return false
        }
      }
    }
    else {
      return false
    }

    return true
  }

  function keyPress(ev){
    if (ev.key == "Enter") {
      guess(ev);
    }
  }

  function updateText(ev){
    setText(ev.target.value);
    console.log(text);
  }

  function reset(){
    setVal();
    setGuesses([]);
  }

  function setVal(){
    let val = ''
    let digitSet = new Set();
    while (val.length < 4){
      let digit = Math.floor(Math.random() * 10)
      if (!digitSet.has(digit)){
        digitSet.add(digit);
        val = val + digit;
      }
    }

    console.log(val)

  }

  useEffect(() => {
    setVal();
  }, []);


  return (
    <div className="App">
      <h1>4 digits</h1>
      <input type="text" 
             onKeyPress={keyPress}
             onChange={updateText}
             value={text}/>
      <button className="guess-button"
              onClick={guess}>
        Guess
      </button>
      <br/>
      <br/>
      <button onClick={reset}>
        Reset Game
      </button>
      <p>Guesses</p>
      <ol>
      {guesses.map((value, index) => {
        return <li key={index}>{value}</li>
      })}
    </ol>

    </div>
  );
}

export default App;
