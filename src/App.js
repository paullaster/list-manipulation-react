import React, {useState} from 'react';
import './App.css';

const initialList = [
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
];

function App() {
  const [list, setList] = useState (initialList);

  const handleChange = (event) => {

  };

  const handleAdd = (event) => {};

  return (
    <div className="App">
      <h1> We want to manipulate list </h1>
      <div>
        <input type="text" id="list" placeholder="add to list" />
        <button type="button">Add</button>
      </div>
      <ul>
        {list.map ( (item) => {
          return (
            <li className='list-item' key={item.ID}>{item.name}</li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
