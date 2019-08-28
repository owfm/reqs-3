export function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export function getAuthToken(getState) {
  // if user is loggin in, get token from redux store and return header
  return getState().auth.authenticated ? getState().auth.authenticated : null;
}
