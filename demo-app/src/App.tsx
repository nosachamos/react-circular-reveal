import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CircularRevealPanel } from 'react-circular-reveal';
import Dashboard from './main/Dashboard';
import SignIn from './main/SignIn';

const App: React.FC = () => {

  const [isOpened, setOpened] = useState(false);

  return (
    <div className="App">

        {/*<CircularRevealPanel*/}
            {/*reveal={isOpened}*/}
            {/*revealContent={*/}
                {/*<div className={'revealed'} onClick={() => setOpened(false)}>*/}
                    {/*<h2>I am revealed with a circular animation.</h2>*/}
                    {/*<span>(Click anywhere to close)</span>*/}
        
                    {/*<h1>Awesome!</h1>*/}
                {/*</div>*/}
            {/*}*/}
        {/*>*/}
        
            {/*<div className={'content'} onClick={() => setOpened(true)}>*/}
                {/*<h1>I am the main content</h1>*/}
                {/*<span>(Click anywhere to trigger a circular reveal)</span>*/}
            {/*</div>*/}
        
        {/*</CircularRevealPanel>*/}

      <CircularRevealPanel
          reveal={isOpened}
          speed={'very slow'}

          revealContent={
            <SignIn onClick={() => setOpened(false)}/>
          }
      >
        <Dashboard onClick={() => setOpened(true)} />

      </CircularRevealPanel>

    </div>
  );
}

export default App;
