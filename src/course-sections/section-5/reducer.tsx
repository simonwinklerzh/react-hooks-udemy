import { getTodoById, TodoType, TodoStateType } from './context';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      }
};

export enum ActionTypes {
  TOGGLE_TODO = 'TOGGLE_TODO'
}

type TodoPayload = {
  [ActionTypes.TOGGLE_TODO]: {
    id: TodoType['id'];
  }
}

export type TodoActions = ActionMap<TodoPayload>[keyof ActionMap<TodoPayload>];

export const todosReducer = (state: TodoStateType, action: TodoActions) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo: TodoType) => {
          if (todo.id === action.payload.id) {
            return {...todo, complete: !todo.complete}
          }
          return todo;
        })
      };
    default:
      return state;
  }
};
