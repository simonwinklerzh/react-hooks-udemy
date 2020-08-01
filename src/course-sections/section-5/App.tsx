import React, { useReducer } from 'react';
import { AppContext, initialState } from './context';
import { todosReducer } from './reducer';
import { TodoList } from './components/todolist';
import { TodoForm } from './components/todoform';
import { createResultsFetcher } from '../../utilities';

const resultsFetcher = createResultsFetcher();

export default function App() {
  const [state, dispatch] = useReducer(todosReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch, resultsFetcher }}>
      <TodoForm />
      <TodoList />
    </AppContext.Provider>
  );
}
