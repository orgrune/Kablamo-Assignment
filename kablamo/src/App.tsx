import React from 'react';
import './App.css';
import StopWatch from './components/StopWatchFixingErrors';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          Stopwatch
          <StopWatch initialSeconds={0} />
      </header>
      
    </div>
  );
}

export default App;
