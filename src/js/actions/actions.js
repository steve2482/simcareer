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
  console.log('registering user'); 
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

// Set valid password
export const SET_VALID_PASSWORD = 'SET_VALID_PASSWORD';
export const setValidPassword = (boolean) => ({
  type: SET_VALID_PASSWORD,
  boolean
});
