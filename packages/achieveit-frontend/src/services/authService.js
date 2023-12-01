// authService.js
const API_PREFIX = "http://localhost:3000";

const INVALID_TOKEN = "INVALID_TOKEN";

function loginUser(creds, setToken, setMessage) {
  const promise = fetch(`${API_PREFIX}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(creds)
  })
    .then((response) => {
      if (response.status === 200) {
        response
          .json()
          .then((payload) => setToken(payload.token));
        setMessage(`Login successful; auth token saved`);
      } else {
        setMessage(
          `Login Error ${response.status}: ${response.data}`
        );
      }
    })
    .catch((error) => {
      setMessage(`Login Error: ${error}`);
    });

  return promise;
}

function fetchUsers(setToken, setMessage) {
  const promise = fetch(`${API_PREFIX}/users`, {
    headers: addAuthHeader(setToken)
  });

  return promise;
}

function addAuthHeader(setToken) {
  const token = getToken(); // You might need a function to get the token
  if (token === INVALID_TOKEN) {
    return {};
  } else {
    setToken(token);
    return {
      Authorization: `Bearer ${token}`
    };
  }
}

export { loginUser, fetchUsers, addAuthHeader };
