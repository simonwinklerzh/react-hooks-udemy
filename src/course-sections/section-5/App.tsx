import React, { useReducer } from 'react';
import { AppContext, initialState } from './context';
import { todosReducer } from './reducer';
import { TodoList } from './components/todolist';
import { TodoForm } from './components/todoform';


export default function App() {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </AppContext.Provider>
  );
}
