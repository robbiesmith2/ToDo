import React, { useReducer, useState } from 'react';
import { AddTask } from './components/addTask';
import ButtonCluster from './components/buttonCluster';
import { TaskList } from './components/taskList';
import { TaskContext } from './taskContext';
import './App.scss';
import { MdAdd } from 'react-icons/md';
import * as firebase from "firebase/app";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCybs9yGeAVWvHcLpzvWVIQjQ4sTmJxNOg",
  authDomain: "to-do-list-4892b.firebaseapp.com",
  databaseURL: "https://to-do-list-4892b.firebaseio.com",
  projectId: "to-do-list-4892b",
  storageBucket: "to-do-list-4892b.appspot.com",
  messagingSenderId: "66635545412",
  appId: "1:66635545412:web:6fb2226458b7aa36037511",
  measurementId: "G-DYZG9R51TE"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const initialState = {
  tasks: []
}

const actions = {
  ADD_TASK: 'ADD_TASK',
  REMOVE_TASK: 'REMOVE_TASK',
  COMPLETE_TASK: 'COMPLETE_TASK',
  INCOMPLETE_TASK: 'INCOMPLETE_TASK',
  EDIT_TASK: 'EDIT_TASK'
}

export const reducer = (state, action) => {
  switch (action.type){
    case actions.ADD_TASK:
      return { 
        tasks: [ ...state.tasks, action.value ]
      }
    case actions.REMOVE_TASK:
      return {
        tasks: state.tasks.filter(task => task.id !== action.value.id)
      }
    case actions.COMPLETE_TASK:
      let completeTaskIndex = state.tasks.findIndex(task => task.id === action.value.id);
      state.tasks[completeTaskIndex].completed = true;
      return { tasks: [ ...state.tasks ]}
    case actions.INCOMPLETE_TASK:
      let incompleteTaskIndex = state.tasks.findIndex(task => task.id === action.value.id);
      state.tasks[incompleteTaskIndex].completed = false;
      return { tasks: [ ...state.tasks ] }
    case actions.EDIT_TASK:
      let editTaskIndex = state.tasks.findIndex(task => task.id === action.value.id);
      state.tasks[editTaskIndex] = action.value;
      return { tasks: [ ...state.tasks ] }
    default:
      return state
  }
}

function App () {
  const [ showModal, toggleShowModal ] = useState(false);
  const [ listFilter, setListFilter ] = useState('none');

  const closeAddTask = () => {
    toggleShowModal(false);
  }

  const filterList = (filter) => {
    setListFilter(filter);
  }

  const toggleAddTaskModal = showModal === true ? <AddTask closeTask={closeAddTask} /> : null;

  return (
    <div className="app-wrapper">
      <Provider>
        <div className="sidebar">
          <h1>To Do List</h1>
          <ButtonCluster callbackFunction={filterList}/>
        </div>
        <div className="main">
          <button className="button button--add-task button--green button--with-icon" onClick={() => toggleShowModal(true)}><MdAdd /><span>Add New Task</span></button>
          {toggleAddTaskModal}
          <TaskList filterList={listFilter} />
        </div>
      </Provider>
    </div>
  )
}

export default App;

const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    tasks: state.tasks,
    addTask: value => {
      dispatch({ type: actions.ADD_TASK, value })
    },
    removeTask: value => {
      dispatch({ type: actions.REMOVE_TASK, value })
    },
    completeTask: value => {
      dispatch({ type: actions.COMPLETE_TASK, value })
    },
    incompleteTask: value => {
      dispatch({ type: actions.INCOMPLETE_TASK, value })
    },
    editTask: value => {
      dispatch({ type: actions.EDIT_TASK, value })
    }
  }

  return (
    <TaskContext.Provider value={ value }>
      { children }
    </TaskContext.Provider>
  )
}