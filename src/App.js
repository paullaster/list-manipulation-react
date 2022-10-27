import React from 'react';
import './App.css';

function App() {
  const namee = [
    {
      name: 'Kennedy',
      ID: 1,
    },
    {
      name: 'John',
      ID: 2,
    },
    {
      name: 'Phonfred',
      ID: 3,
    }
  ]
  return (
    <div className="App">
      <h1> We want to manipulate list </h1>
      <ul>
        {namee.map ( (item) => {
          return (
            <li className='list-item'>{item.name}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
