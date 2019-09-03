import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CircularRevealPanel } from 'react-circular-reveal';
import Dashboard from './main/Dashboard';

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
        <Dashboard onClick={() => setConfirming(true)}/>

      </CircularRevealPanel>

    </div>
  );
}

export default App;
