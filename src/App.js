import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [secret, setSecret] = useState(1234);
  const [guesses, setGuesses] = useState([]);
  const [text, setText] = useState("");
  const [lives, setLives] = useState(8);
  const [message, setMessage] = useState("Game over, you lost")

  // called each time the user guesses to check if they won or 
  // ran out of lives
  function check_game_over(text) {
    if (text == secret) {
      setMessage("You Won!");
      setLives(0);
    } else {
      setLives(lives - 1);
    }
  }

  // called when a user hits enter or selects the guess button
  // first validates the guess and then adds it to guess list
  function guess(ev) {
    let valid_guess = validateGuess(text);
    setText("");
    if (valid_guess) {
      let ng = guesses.concat(text);
      console.log("ng", ng);
      setGuesses(ng);
      check_game_over(text);
    } else {
      console.log("invalid guess");
      alert("Guesses must be composed of 4 unigue digits and be unique from previous guesses.");
    }
  }

  // ensures that a guess is 4 unique digits and has not been
  // already guessed
  function validateGuess(guess) {
    if (guesses.includes(guess)){
      return false;
    }
    let valid_guess_digit = new Set([
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ]);
    let used_digits = new Set();
    if (guess.length == 4) {
      for (let i = 0; i < guess.length; i++) {
        if (valid_guess_digit.has(guess[i]) && !used_digits.has(guess[i])) {
          used_digits.add(guess[i]);
        } else {
          return false;
        }
      }
    } else {
      return false;
    }

    return true;
  }

  function keyPress(ev) {
    if (ev.key == "Enter") {
      guess(ev);
    }
  }

  function updateText(ev) {
    setText(ev.target.value);
    console.log(text);
  }

  // resets the game back to an initial state
  function reset() {
    setVal();
    setGuesses([]);
    setLives(8);
    setMessage("Game over, you lost")
  }

  function setVal() {
    let val = "";
    let digitSet = new Set();
    while (val.length < 4) {
      let digit = Math.floor(Math.random() * 10);
      if (!digitSet.has(digit)) {
        digitSet.add(digit);
        val = val + digit;
      }
    }

    setSecret(val);
    console.log(val);
  }

  // calculates the "bulls" and "cows" for a guess
  function getResult(text) {
    let guess_text = text.split("");
    let actual_text = secret.split("");

    var i;
    let wrong_place = 0;
    let correct_place = 0;
    for (i = 0; i < 4; i++) {
      if (guess_text[i] == actual_text[i]) {
        correct_place += 1;
      } else if (actual_text.includes(guess_text[i])) {
        console.log("in else");
        console.log(guess_text[i]);
        console.log(actual_text);
        wrong_place += 1;
      }
    }
    return correct_place + " bulls; " + wrong_place + " cows";
  }

  useEffect(() => {
    setVal();
  }, []);

  // the screen that is displayed when a game is over
  function GameOver() {
    return (
      <div>
        <p>
          {message}
        </p>
        <button onClick={reset}>Reset Game</button>
      </div>
    );
  }

  let body = null;

  if (lives > 0) {
    body = (
      <div>
        <h2>{lives} Lives left!</h2>
        <input
          type="text"
          onKeyPress={keyPress}
          onChange={updateText}
          value={text}
        />
        <button className="guess-button" onClick={guess}>
          Guess
        </button>
        <br />
        <br />
        <button onClick={reset}>Reset Game</button>
        <p>Guesses</p>
        <ol>
          {guesses.map((value, index) => {
            return <li key={index}>{value + " " + getResult(value)}</li>;
          })}
        </ol>
      </div>
    );
  }
  else {
    body = (
      <div>
        <GameOver/>
      </div>
    )
  }

  return (
    <div className="App">
      <h1>4 digits</h1>
      {body}
    </div>
  );
}

export default App;
