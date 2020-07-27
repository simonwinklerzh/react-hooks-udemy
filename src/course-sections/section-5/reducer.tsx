import { getTodoById, TodoType } from './context';

export const todosReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'TOGGLE_TODO':
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
