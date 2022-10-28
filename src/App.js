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
    case 'DELETE_ITEM':
      return {
        ...state,
        list: state.list.filter ( item => item.ID !== action.id)
      }
    default:
      throw new Error ( 'Invalid action type: ' + action.type);
  }
};

const initialList = [
  {
    name: 'Kennedy',
    ID: uuidv4 (),
  },
  {
    name: 'John',
    ID: uuidv4 (),
  },
  {
    name: 'Phonfred',
    ID: uuidv4 (),
  }
];

const AddItem = ( {value, onChange, onClick}) => {
  return (
    <React.Fragment>
      <input value={value} onChange={onChange} />
      <Button type="button" onClick={onClick}>
        Add
      </Button>
    </React.Fragment>
  );
};

const Button = ( {onClick, type="button", children}) => {
  return (
    <button onClick={onClick} type={type}>
      {children}
    </button>
  );
};

const List = ( {list, remove} ) => {
  return (
    <ul>
      {
        list.map ( (item) => {
          return (
              <Item key={item.ID} item={item} remove={remove}/>
          );
        })
      }
    </ul>
  );
};

const Item = ( {item, remove} ) => {
  return (
    <li className='list-item'>
      {item.name}
      <Button onClick={ () =>remove (item.ID)}>
                Remove Item
      </Button>
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

  const handleRemove = (id) => {
    dispatchList ( {type: 'DELETE_ITEM', id});
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
       remove={handleRemove}
       />
    </div>
  );
}

export default App;
