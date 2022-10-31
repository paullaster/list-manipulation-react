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
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        list: state.list.map ( (item) => {
          if ( item.ID === action.id) {
            const updatedItem = {
              ...item,
              isRelative: !item.isRelative
            };
            return updatedItem;
          }
          return item
        })
      }  
    default:
      throw new Error ( 'Invalid action type: ' + action.type);
  }
};

const initialList = [
  {
    name: 'Kennedy',
    isRelative: false,
    ID: uuidv4 (),
  },
  {
    name: 'John',
    isRelative: false,
    ID: uuidv4 (),
  },
  {
    name: 'Phonfred',
    isRelative: true,
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

const List = ( {list, remove, onUpdate} ) => {
  return (
    <ul>
      {
        list.map ( (item) => {
          return (
              <Item key={item.ID} item={item} remove={remove} onUpdate={onUpdate}/>
          );
        })
      }
    </ul>
  );
};

const Item = ( {item, remove, onUpdate} ) => {
  return (
    <li className='list-item'>
      {item.name}
      <React.Fragment>
        <Button onClick={ () =>remove (item.ID)}>
                  Remove Item
        </Button>
        <Button onClick={ () =>onUpdate (item.ID)} >
                  {item.isRelative ? 'Yes' : 'No'}
        </Button>
      </React.Fragment>
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

  const handleUpdate = (id) => {
    dispatchList ( { type: 'UPDATE_ITEM', name, id})
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
       onUpdate={handleUpdate}
       />
    </div>
  );
}

export default App;
