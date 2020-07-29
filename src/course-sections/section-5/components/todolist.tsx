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
            className="mr-2 d-flex align-items-center"
            onClick={(e: React.MouseEvent) => {
              dispatch({
                type: ActionTypes.EDIT_TODO,
                payload: {
                  editId: todo.id
                }
              })
            }}
            type="button">
              <svg style={{ width: '14px', height: '14px', marginRight: '4px' }} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
              </svg>
              Edit
            </Button>
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
            variant="danger"
            className="d-flex align-items-center">
              <svg style={{ width: '14px', height: '14px', marginRight: '4px' }} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-trash2-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.037 3.225l1.684 10.104A2 2 0 0 0 5.694 15h4.612a2 2 0 0 0 1.973-1.671l1.684-10.104C13.627 4.224 11.085 5 8 5c-3.086 0-5.627-.776-5.963-1.775z"/>
                <path fillRule="evenodd" d="M12.9 3c-.18-.14-.497-.307-.974-.466C10.967 2.214 9.58 2 8 2s-2.968.215-3.926.534c-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466zM8 5c3.314 0 6-.895 6-2s-2.686-2-6-2-6 .895-6 2 2.686 2 6 2z"/>
              </svg>
              Remove
            </Button>
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
            <Button className="mr-2 d-flex align-items-center" variant="success" type="submit">
              <svg style={{ width: '14px', height: '14px', marginRight: '4px', transform: 'scale(1.6)' }} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/>
              </svg>
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
              }}
              className="d-flex align-items-center">
              <svg style={{ width: '14px', height: '14px', marginRight: '4px', transform: 'scale(1.6)' }} width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"/>
                <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"/>
              </svg>
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
