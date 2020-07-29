import React, { createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoActions } from './reducer';

export type TodoType = {
  id: string;
  text: string;
  complete: boolean;
}

export enum FilterType {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLETE = 'COMPLETE'
}

export type TodoStateType = {
  todos: TodoType[];
  editId: string | null;
  filterType: FilterType;
}

export const createNewTodo = (): TodoType => ({ id: uuidv4(), text: '', complete: false });

export const getTodoById = (state: TodoStateType, id: TodoType['id']) => {
  return state.todos.find(todo => todo.id === id);
}

export const initialState = {
  todos: [
    {...createNewTodo(), text: 'Apfel'},
    {...createNewTodo(), text: 'Birne'},
    {...createNewTodo(), text: 'Orange'}
  ],
  editId: null,
  filterType: FilterType.ALL
}

export const AppContext = createContext<{
  state: TodoStateType;
  dispatch: React.Dispatch<TodoActions>;
}>({
  state: initialState,
  dispatch: () => null
});
