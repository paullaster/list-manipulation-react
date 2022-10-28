import React, {useState} from 'react';
import { v4 as uuidv4} from 'uuid';
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

const AddItem = ( {value, onChange, onClick}) => {
  
};

const List = () => {};

const App = () => {
  const [list, setList] = useState (initialList);
  const [name, setName] = useState ('');

  const handleChange = (event) => {
     setName (event.target.value);
  };

  const handleAdd = (event) => {
    const newList = list.concat ( {name, ID: uuidv4});
    setList ( newList );

    setName ('');
  };

  return (
    <div className="App">
      <h1> We want to manipulate list </h1>
      <AddItem
      value={name}
      onChange={handleChange}
      onClick={handleAdd} />

      <List
       list={list}
       />
    </div>
  );
}

export default App;
