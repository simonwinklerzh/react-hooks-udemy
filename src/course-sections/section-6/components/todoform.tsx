import React, { useContext, useState, FormEvent } from 'react';
import {
  Container,
  Button,
  InputGroup,
  FormControl
} from 'react-bootstrap';
import { AppContext, createNewTodo, TodoType } from '../context';
import { ActionTypes, TodoActions } from '../reducer';
import {
  ResultStatusType,
  resultsAddFetcher,
  AddResult
} from '../../../utilities';

const handleSubmit = (
  todo: TodoType,
  dispatch: React.Dispatch<TodoActions>
) => {
  if (todo.text.trim()) {
    const addUrl = `https://hooks-api.simonwinklerzh.vercel.app/todos/`;
    resultsAddFetcher(
      addUrl,
      todo,
      function (result: AddResult) {
        switch (result.status) {
          case ResultStatusType.SUCCESS:
            dispatch({
              type: ActionTypes.ADD_TODO,
              payload: { todo }
            });
            return;
        }
      }
    );
  }
}

export const TodoForm = () => {
  const { state, dispatch } = useContext(AppContext);
  const [ todo, setTodo ] = useState(createNewTodo());
  return (
    <Container>
      <h1 className="mt-3 h4">Create Todo</h1>
      <form onSubmit={(e: FormEvent) => {
        e.preventDefault();
        handleSubmit(todo, dispatch);
        setTodo(createNewTodo());
      }}>
        <InputGroup className="mb-3">
          <FormControl
            autoFocus
            placeholder="What has to be done next?"
            aria-label="Create new Todo"
            aria-describedby="basic-addon2"
            value={todo.text}
            onChange={(e) => {
              setTodo({
                ...todo,
                text: e.target.value
              });
            }}
          />
          <InputGroup.Append>
            <Button
              disabled={todo.text === ''}
              type="submit">Add Todo</Button>
          </InputGroup.Append>
        </InputGroup>
      </form>
    </Container>
  );
}
