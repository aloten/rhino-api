import React from 'react';
import RhinoList from './components/RhinoList';
import { Armadillo } from './components/Armadillo';

// Testing typescript for heroku deployment issues
const nelson = new Armadillo('nelson');

function App() {
  return (
    <div className='main-content'>
      <h1>Rhino API</h1>
      <RhinoList />
    </div>
  );
}

export default App;
