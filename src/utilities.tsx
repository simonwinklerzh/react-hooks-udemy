import { TodoType } from './course-sections/section-5/context';

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        status: Key;
      }
    : {
        status: Key;
        data: M[Key];
      }
};

export const handleStatusCodeError = (response: Response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

export const handleWrongContentType = (response: Response) => {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error("Oops, we haven't got JSON!");
  }
  return response;
}

export const handleErrors = (response: Response) => handleStatusCodeError(handleWrongContentType(response));

export enum ResultStatusType {
  SUCCESS = 'SUCCESS',
  LOADING = 'LOADING',
  ERROR = 'ERROR'
}

export type ResultPayload = {
  [ResultStatusType.SUCCESS]: TodoType[],
  [ResultStatusType.LOADING]: true,
  [ResultStatusType.ERROR]: Error
}

export interface ResultDeletePayload {
  [ResultStatusType.SUCCESS]: true,
  [ResultStatusType.LOADING]: true,
  [ResultStatusType.ERROR]: Error
}

export interface ResultAddPayload {
  [ResultStatusType.SUCCESS]: true,
  [ResultStatusType.LOADING]: true,
  [ResultStatusType.ERROR]: Error
}

export interface ResultUpdatePayload {
  [ResultStatusType.SUCCESS]: TodoType,
  [ResultStatusType.LOADING]: true,
  [ResultStatusType.ERROR]: Error
}

export type Result = ActionMap<ResultPayload>[keyof ActionMap<ResultPayload>];
export type DeleteResult = ActionMap<ResultDeletePayload>[keyof ActionMap<ResultDeletePayload>];
export type AddResult = ActionMap<ResultAddPayload>[keyof ActionMap<ResultAddPayload>];
export type UpdateResult = ActionMap<ResultUpdatePayload>[keyof ActionMap<ResultUpdatePayload>];

export interface HandleResultsDataFunc {
  (result: Result): void;
}

export interface HandleResultsDeleteDataFunc {
  (result: DeleteResult): void
}

export interface HandleResultsAddDataFunc {
  (result: DeleteResult): void
}

export interface HandleResultsUpdateDataFunc {
  (result: UpdateResult): void
}

export const createResultsFetcher = () => {
  let mostRecentQuery: string;
  return function resultsFetcher(query: string, handleResultUpdate: HandleResultsDataFunc) {
    mostRecentQuery = query;
    handleResultUpdate({
      status: ResultStatusType.LOADING,
      data: true
    });
    fetch(query)
      .then(handleErrors)
      .then(response => response.json())
      .then(responseObject => {
        if (query === mostRecentQuery) {
          handleResultUpdate({
            status: ResultStatusType.SUCCESS,
            data: responseObject
          });
        }
      })
      .catch((error) => {
        console.error(error);
        if (query === mostRecentQuery) {
          handleResultUpdate({
            status: ResultStatusType.ERROR,
            data: error
          });
        }
      });
  }
}

export const resultsDeleteFetcher = (
  query: string,
  handleResultsDeleteUpdate: HandleResultsDeleteDataFunc
) => {
  handleResultsDeleteUpdate({
    status: ResultStatusType.LOADING,
    data: true
  });
  fetch(query, { method: 'DELETE' })
    .then(handleErrors)
    .then(response => response.json())
    .then(responseObject => {
      handleResultsDeleteUpdate({
        status: ResultStatusType.SUCCESS,
        data: responseObject
      })
    })
    .catch((error) => {
      console.error(error);
      handleResultsDeleteUpdate({
        status: ResultStatusType.ERROR,
        data: error
      })
    })
}

export const resultsAddFetcher = (
  query: string,
  data: TodoType,
  handleResultsDeleteUpdate: HandleResultsAddDataFunc
) => {
  handleResultsDeleteUpdate({
    status: ResultStatusType.LOADING,
    data: true
  });
  fetch(query, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(responseObject => {
      handleResultsDeleteUpdate({
        status: ResultStatusType.SUCCESS,
        data: responseObject
      })
    })
    .catch((error) => {
      console.error(error);
      handleResultsDeleteUpdate({
        status: ResultStatusType.ERROR,
        data: error
      })
    })
}

export const resultsUpdateFetcher = (
  query: string,
  data: TodoType,
  handleResultsUpdate: HandleResultsUpdateDataFunc
) => {
  handleResultsUpdate({
    status: ResultStatusType.LOADING,
    data: true
  });
  fetch(query, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(data)
    })
    .then(handleErrors)
    .then(response => response.json())
    .then(responseObject => {
      handleResultsUpdate({
        status: ResultStatusType.SUCCESS,
        data: responseObject
      })
    })
    .catch((error) => {
      console.error(error);
      handleResultsUpdate({
        status: ResultStatusType.ERROR,
        data: error
      })
    })
}
