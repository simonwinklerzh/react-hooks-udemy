import React, { useContext } from 'react';
import {
  Container,
  ListGroup,
  Form
} from 'react-bootstrap';
import { AppContext, TodoType } from '../context';

const TodoItemTemplate = (todo: TodoType, dispatch: React.Dispatch<any>) => (
  <ListGroup.Item key={todo.id}>
    <Form.Group  className="mb-0" controlId={`formBasicCheckbox-${todo.id}`}>
      <Form.Check checked={todo.complete} type="checkbox" label={todo.text} />
    </Form.Group>
  </ListGroup.Item>
);

export const TodoList = () => {
  const { state, dispatch } = useContext(AppContext);
  return (
    <Container>
      <h4 className="mt-3">Todos</h4>
      { state.todos.length
        ? (
          <ListGroup>
            {state.todos.map(todo => {
              return TodoItemTemplate(todo, dispatch);
            })}
          </ListGroup>
        )
        : null
      }
    </Container>
  );
}
