import React, { useContext, useRef, FormEvent } from 'react';
import {
  Container,
  ListGroup,
  InputGroup,
  FormControl,
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
      <div className="d-flex justify-content-between align-items-center">
        <InputGroup className="mr-2">
          <InputGroup.Prepend>
            <InputGroup.Checkbox
              onChange={(e: React.ChangeEvent) => {
                dispatch({
                  type: ActionTypes.TOGGLE_TODO,
                  payload: {
                    id: todo.id
                  }
                });
              }}
              checked={todo.complete}
              aria-label="Checkbox for following text input" />
          </InputGroup.Prepend>
          <FormControl
            readOnly
            defaultValue={todo.text}
            aria-label="Text input with checkbox" />
        </InputGroup>
        <div className="d-flex">
          <Button
            className="mr-2"
            onClick={(e: React.MouseEvent) => {
              dispatch({
                type: ActionTypes.EDIT_TODO,
                payload: {
                  editId: todo.id
                }
              })
            }}
            type="button">Edit</Button>
           {' '}
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
            variant="danger">Remove</Button>
        </div>
      </div>
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
      <Form.Group  className="mb-0" controlId={`formBasicCheckbox-${todo.id}`}>
        <div className="d-flex justify-content-between align-items-center">
          <InputGroup className="mr-2">
            <InputGroup.Prepend>
              <InputGroup.Checkbox
                disabled
                onChange={(e: React.ChangeEvent) => {
                  dispatch({
                    type: ActionTypes.TOGGLE_TODO,
                    payload: {
                      id: todo.id
                    }
                  });
                }}
                checked={todo.complete}
                aria-label="Checkbox for following text input" />
            </InputGroup.Prepend>
            <FormControl
              defaultValue={todo.text}
              ref={editTodoInputRef}
              autoFocus
              aria-label="Text input with checkbox" />
          </InputGroup>
          <div className="d-flex">
            <Button className="mr-2" variant="success" type="submit">
              Save
            </Button>
            <Button
              variant="warning"
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
          </div>
        </div>
      </Form.Group>
    </Form>
  </ListGroup.Item>
);

export const TodoList = () => {
  const { state, dispatch } = useContext(AppContext);
  const editTodoInputRef = useRef<HTMLInputElement>(null);
  return (
    <Container>
      <h2 className="mt-3 h4">Todos</h2>
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
