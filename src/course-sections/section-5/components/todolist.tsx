import React, { useContext, useRef, FormEvent } from 'react';
import {
  Container,
  ListGroup,
  Form,
  Button
} from 'react-bootstrap';
import { AppContext, TodoType, TodoStateType } from '../context';
import { ActionTypes, TodoActions } from '../reducer';

const TodoItemTemplate = (
  todo: TodoType,
  dispatch: React.Dispatch<TodoActions>,
  editId: TodoStateType['editId']
) => (
  <ListGroup.Item key={todo.id}>
    <Form.Group  className="mb-0" controlId={`formBasicCheckbox-${todo.id}`}>
      <Form.Check
        onChange={(e: React.ChangeEvent) => {
          dispatch({
            type: ActionTypes.TOGGLE_TODO,
            payload: {
              id: todo.id
            }
          });
        }}
        checked={todo.complete}
        type="checkbox"
        label={todo.text} />
      <Button
        onClick={(e: React.MouseEvent) => {
          dispatch({
            type: ActionTypes.REMOVE_TODO,
            payload: {
              id: todo.id
            }
          })
        }}
        type="button"
        variant="warning">Remove</Button>
      <Button
        onClick={(e: React.MouseEvent) => {
          dispatch({
            type: ActionTypes.EDIT_TODO,
            payload: {
              editId: todo.id
            }
          })
        }}
        type="button"
        variant="info">Edit</Button>
    </Form.Group>
  </ListGroup.Item>
);

const EditTodoItemTemplate = (
  todo: TodoType,
  dispatch: React.Dispatch<TodoActions>,
  editId: TodoStateType['editId'],
  editTodoInputRef: React.RefObject<HTMLInputElement>
) => (
  <ListGroup.Item key={todo.id}>
    <Form onSubmit={(e: FormEvent) => {
      e.preventDefault();
      if (editTodoInputRef?.current) {
        dispatch({
          type: ActionTypes.UPDATE_TODO,
          payload: {
            todo: {
              ...todo,
              text: editTodoInputRef.current.value
            }
          }
        });
      }
    }}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Edit Todo</Form.Label>
        <Form.Control
          type="text"
          defaultValue={todo.text}
          ref={editTodoInputRef} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Save
      </Button>
      {' '}
      <Button
        variant="primary"
        type="button"
        onClick={(e: React.MouseEvent) => {
          dispatch({
            type: ActionTypes.EDIT_TODO,
            payload: {
              editId: null
            }
          })
        }}>
        Cancel
      </Button>
    </Form>
  </ListGroup.Item>
);

export const TodoList = () => {
  const { state, dispatch } = useContext(AppContext);
  const editTodoInputRef = useRef<HTMLInputElement>(null);
  return (
    <Container>
      <h4 className="mt-3">Todos</h4>
      { state.todos.length
        ? (
          <ListGroup>
            {state.todos.map(todo => {
              return todo.id === state.editId
                ? EditTodoItemTemplate(todo, dispatch, state.editId, editTodoInputRef)
                : TodoItemTemplate(todo, dispatch, state.editId);
            })}
          </ListGroup>
        )
        : null
      }
    </Container>
  );
}
