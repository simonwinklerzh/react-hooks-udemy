import React from 'react';
import {
  Container
} from 'react-bootstrap';

const UserContext = React.createContext({
  userName: 'User name'
});

export default function App() {
  return (
    <UserContext.Provider value={{
      userName: 'Simon'
    }}>
      <UserContext.Consumer>
        {(value) => (
          <Container>
            <h1>Hello {value.userName}</h1>
          </Container>
        )}
      </UserContext.Consumer>
    </UserContext.Provider>
  );
}
