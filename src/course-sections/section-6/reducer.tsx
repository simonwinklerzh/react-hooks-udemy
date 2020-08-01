import { TodoType, TodoStateType, FilterType } from './context';

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
  TOGGLE_TODO = 'TOGGLE_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  ADD_TODO = 'ADD_TODO',
  UPDATE_TODO = 'UPDATE_TODO',
  EDIT_TODO = 'EDIT_TODO',
  SET_FILTER = 'SET_FILTER',
  CLEAR_COMPLETED = 'CLEAR_COMPLETED'
}

type TodoPayload = {
  [ActionTypes.TOGGLE_TODO]: {
    id: TodoType['id'];
  },
  [ActionTypes.REMOVE_TODO]: {
    id: TodoType['id'];
  },
  [ActionTypes.ADD_TODO]: {
    todo: TodoType;
  },
  [ActionTypes.UPDATE_TODO]: {
    todo: TodoType;
  },
  [ActionTypes.EDIT_TODO]: {
    editId: TodoType['id'] | null;
  },
  [ActionTypes.SET_FILTER]: {
    filter: FilterType;
  },
  [ActionTypes.CLEAR_COMPLETED]: true
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
    case ActionTypes.REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo: TodoType) => todo.id !== action.payload.id)
      };
    case ActionTypes.ADD_TODO:
      return {
        ...state,
        todos: [action.payload.todo, ...state.todos]
      }
    case ActionTypes.UPDATE_TODO:
      return {
        ...state,
        editId: null,
        todos: state.todos.map(todo => {
          if (todo.id === action.payload.todo.id) {
            return action.payload.todo;
          }
          return todo;
        })
      }
    case ActionTypes.EDIT_TODO:
      return {
        ...state,
        editId: action.payload.editId
      }
    case ActionTypes.SET_FILTER:
      return {
        ...state,
        filterType: action.payload.filter
      }
    case ActionTypes.CLEAR_COMPLETED:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.complete !== true)
      }
    default:
      return state;
  }
};
