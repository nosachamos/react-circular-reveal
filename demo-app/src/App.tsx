import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CircularRevealPanel } from '../../src/CircularRevealPanel';

const App: React.FC = () => {

  const [confirming, setConfirming] = useState(false);

  return (
    <div className="App">

      <CircularRevealPanel
          reveal={confirming}

          revealContent={
            <div className={'revealed'}>
              <h2>I am revealed.</h2>

              <h1>Awesome!</h1>

              <button onClick={() => setConfirming(false)}>
                CLOSE
              </button>
            </div>
          }
      >
        <div className={'content'} onClick={() => setConfirming(true)}>
          <h1>I am displayed by default</h1>
        </div>

      </CircularRevealPanel>


      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
