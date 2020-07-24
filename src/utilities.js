export const handleStatusCodeError = (response) => {
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response;
}

export const handleWrongContentType = (response) => {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error("Oops, we haven't got JSON!");
  }
  return response;
}

export const handleErrors = (response) => handleStatusCodeError(handleWrongContentType(response));
