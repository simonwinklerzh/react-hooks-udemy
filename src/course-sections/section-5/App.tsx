import React, { useContext } from 'react';
import {
  Container
} from 'react-bootstrap';

interface IUserContext {
  userName: string;
}

const defaultUserContext: IUserContext = {
  userName: 'Simon'
}

const UserContext = React.createContext<IUserContext>(defaultUserContext);

export default function App() {
  const userContext: IUserContext = useContext(UserContext);

  return (
    <Container>
      <h1>Hello {userContext.userName}</h1>
    </Container>
  );
}
