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

export const getActiveTodos = (state: TodoStateType) => state.todos.filter(todo => {
  return todo.complete !== true;
});

export const getActiveTodosCount = (state: TodoStateType) => {
  return getActiveTodos(state)
    ? getActiveTodos(state).length
    : 0
}

export const getCompletedTodos = (state: TodoStateType) => state.todos.filter(todo => {
  return todo.complete === true;
});

export const getCompletedTodosCount = (state: TodoStateType) => {
  return getCompletedTodos(state)
    ? getCompletedTodos(state).length
    : 0
}

export const todoFilterFunction = (todo: TodoType, filter: FilterType): boolean => {
  switch (filter) {
    case FilterType.COMPLETE:
      return todo.complete === true;
    case FilterType.ACTIVE:
      return todo.complete === false;
    default:
      return true;
  }
}

export const initialState = {
  todos: [],
  editId: null,
  filterType: FilterType.ALL
}

export const AppContext = createContext<{
  state: TodoStateType;
  dispatch: React.Dispatch<TodoActions>;
  resultsFetcher: Function;
}>({
  state: initialState,
  dispatch: () => null,
  resultsFetcher: () => null
});
