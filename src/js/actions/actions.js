// Toggle Login Modal
export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';
export const toggleLoginModal = () => ({
  type : TOGGLE_LOGIN_MODAL
});

// Toggle Register Modal
export const TOGGLE_REGISTER_MODAL = 'TOGGLE_REGISTER_MODAL';
export const toggleRegisterModal = () => ({
  type : TOGGLE_REGISTER_MODAL
});

// Toggle Contact Modal
export const TOGGLE_CONTACT_MODAL = 'TOGGLE_CONTACT_MODAL';
export const toggleContactModal = () => ({
  type : TOGGLE_CONTACT_MODAL
});

// Set Errors
export const SET_ERRORS = 'SET_ERRORS';
export const setErrors = errors => ({
  type: SET_ERRORS,
  errors
});

// Enter User into state
export const ENTER_USER_STATE = 'ENTER_USER_STATE';
export const enterUserState = (user) => ({
  type: ENTER_USER_STATE,
  user
});

// Register User
export const registerNewUser = (newUser, history) => dispatch => { 
  const url = process.env.REACT_APP_ROOT_URL + '/register';
  const payload = JSON.stringify(newUser);
  const request = new Request(url, {
    method: 'POST',
    body: payload,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include'
  });
  return fetch(request)
  .then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong while registering user.');
      console.log(error);
      response.json()
      .then(response => {
        dispatch(setErrors(response));
      });      
    }
    return response.json();
  })
  .then(response => {
    dispatch(enterUserState(response));
  })
  .then(() => history.push('/about'))
  .catch(error => console.log(error));
}

// Set idIsValid
export const ID_IS_VALID = 'ID_IS_VALID';
export const setIdIsValid = boolean => ({
  type: ID_IS_VALID,
  boolean
});

// Validate MemberId is not in use
export const validateNewMemberId = (memberId) => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/validate-memberId';
  const payload = JSON.stringify(memberId);
  const request = new Request(url, {
    method: 'POST',
    body: payload,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include'
  });
  return fetch(request)
  .then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong while validating memberId');
      console.log(error);
    }
    return response.json();
  })
  .then(response => {
    dispatch(setErrors(response.message));
    dispatch(setIdIsValid(response.idIsValid));
  })
  .catch(error => console.log(error));
}

// Set valid password
export const SET_VALID_PASSWORD = 'SET_VALID_PASSWORD';
export const setValidPassword = (boolean) => ({
  type: SET_VALID_PASSWORD,
  boolean
});

// User Login
export const userLogIn = (user, history) => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/login';
  const payload = JSON.stringify(user);
  const request = new Request(url, {
    method: 'POST',
    body: payload,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include'
  });
  return fetch(request)
  .then(response => {
    console.log(response);
    if (!response.ok) {
      const error = new Error('Something went wrong during user login.');
      console.log(error);
      response.json()
      .then(response => {
        dispatch(setErrors(response));
      });
    }
    else {
      response.json()
      .then(response => {
        dispatch(enterUserState(response));
        dispatch(toggleLoginModal());
        return response.userName
      })
      .then(userName => {
        history.push(`/${userName}/dashboard`);
      });      
    }
  })
  .catch(error => console.log(error));
}
