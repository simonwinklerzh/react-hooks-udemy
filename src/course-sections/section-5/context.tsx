import React, { createContext } from 'react';

export type TodoType = {
  id: number;
  text: string;
  complete: boolean;
}

type InitialStateType = {
  todos: TodoType[];
}

export const initialState = {
  todos: [
    {id: 1, text: 'Putzen', complete: false },
    {id: 2, text: 'Einkaufen', complete: false }
  ]
}

export const AppContext = createContext<{
  state: InitialStateType;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null
});
