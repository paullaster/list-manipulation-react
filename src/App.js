import React, {useState, useReducer} from 'react';
import { v4 as uuidv4} from 'uuid';
import './App.css';


//Reducer functions
const listReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        list: state.list.concat ( {name: action.name, ID: action.id})
      };
    default:
      throw new Error ( 'Invalid action type: ' + action.type);
  }
};

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
  return (
    <React.Fragment>
      <input value={value} onChange={onChange} />
      <button type="button" onClick={onClick}>
        Add
      </button>
    </React.Fragment>
  );
};

const List = ( {list} ) => {
  return (
    <ul>
      {
        list.map ( (item) => {
          return (
            <Item key={item.ID} item={item} />
          );
        })
      }
    </ul>
  );
};

const Item = ( {item} ) => {
  return (
    <li className='list-item'>
      {item.name}
    </li>
  );
}

const App = () => {
  const [listData, dispatchList] = useReducer (
    listReducer,
    {
      list: initialList,
      isShowList: true,
    }
    );
  const [name, setName] = useState ('');

  const handleChange = (event) => {
     setName (event.target.value);
  };

  const handleAdd = (event) => {
    dispatchList ( {type: 'ADD_ITEM', name, id: uuidv4 ()});
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
       list={listData.list}
       />
    </div>
  );
}

export default App;
