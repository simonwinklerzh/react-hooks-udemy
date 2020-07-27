import React, { createContext } from 'react';

export type TodoType = {
  id: number;
  text: string;
  complete: boolean;
}

export type TodoStateType = {
  todos: TodoType[];
}

export const initialState = {
  todos: [
    {id: 1, text: 'Putzen', complete: false },
    {id: 2, text: 'Einkaufen', complete: false }
  ]
}

export const getTodoById = (state: TodoStateType, id: TodoType['id']) => {
  return state.todos.find(todo => todo.id === id);
}

export const AppContext = createContext<{
  state: TodoStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});
