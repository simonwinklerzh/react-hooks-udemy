import React, { useReducer } from 'react';
import { AppContext, initialState } from './context';
import { todosReducer } from './reducer';
import { TodoList } from './components/todolist';


export default function App() {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <TodoList />
    </AppContext.Provider>
  );
}
