import React, { useContext, useReducer } from 'react';
import {
  Container
} from 'react-bootstrap';

interface IUserContext {
  userName: string;
}

interface IState {
  count: number;
}

interface IAction {
  type: string;
}

const defaultUserContext: IUserContext = {
  userName: 'Simon'
}

const initialState: IState = {
  count: 0
}

const reducer = (state: IState, action: IAction) => {
  switch(action.type) {
    case 'increment':
      return {
        ...state,
        count: state.count + 1
      };
    case 'decrement':
      return {
        ...state,
        count: Math.max(state.count - 1, 0)
      };
    case 'reset':
      return initialState;
    default:
      return state;
  }
}

const UserContext = React.createContext<IUserContext>(defaultUserContext);

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const userContext: IUserContext = useContext(UserContext);

  return (
    <Container>
      <h1>Hello {userContext.userName}</h1>
      <p><b>Count:</b> {state.count}</p>
      <button
        onClick={(e) => dispatch({ type: 'increment' })}
        type="button">Increment</button>
      <button
        disabled={state.count === 0}
        onClick={(e) => dispatch({ type: 'decrement' })}
        type="button">Decrement</button>
      <button
        onClick={(e) => dispatch({ type: 'reset' })}
        type="button">Reset</button>
    </Container>
  );
}
