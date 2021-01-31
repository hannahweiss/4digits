import './App.css';
import { useState } from 'react';

function App() {
  const [secret, setSecret] = useState(1234)
  // TODO: should guesses be a set? can a user do the same guess twice in one game
  const [guesses, setGuesses] = useState([])

  function guess(ev) {
    let ng = guesses.concat(ev.target.value);
    ev.target.value = "";
    console.log("ng", ng);
    setGuesses(ng);
  }

  function keyPress(ev){
    if (ev.key == "Enter") {
      guess(ev);
    }
  }


  return (
    <div className="App">
      <h1>4 digits</h1>
      <input type="text" 
             onKeyPress={keyPress}/>
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
