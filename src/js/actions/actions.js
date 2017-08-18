// Toggle Login Modal
export const TOGGLE_LOGIN_MODAL = 'TOGGLE_LOGIN_MODAL';
export const toggleLoginModal = () => ({
  type : TOGGLE_LOGIN_MODAL
});

// Toggle Login Modal
export const TOGGLE_FORGOT_PASSWORD_MODAL = 'TOGGLE_FORGOT_PASSWORD_MODAL';
export const toggleForgotPasswordModal = () => ({
  type : TOGGLE_FORGOT_PASSWORD_MODAL
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
    return response;
  })
  .then((user) => history.push(`/${user.userName}/dashboard`))
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

// User Logout
export const userLogout = history => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/logout';
  const request = new Request(url, {
    method: 'GET'
  });
  return fetch(request)
  .then(response => {
    if (!response.ok) {
      const error = new Error('Somthing went wrong during user logout');
      console.log(error);
    }
    return response;
  })
  .then(() => {
    dispatch(enterUserState(null));
    history.push('/');
  })
  .catch(error => console.log(error));
}

// Reset Password
export const resetPassword = userInfo => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/reset-password';
  const payload = JSON.stringify(userInfo);
  const request = new Request(url , {
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
      const error = new Error('Something went wrong while trying to reset user password');
      console.log(error);
      dispatch(setErrors(response));
      dispatch(toggleForgotPasswordModal());
    }
  })
  .catch(error => console.log(error));
}


// Toggle Contact Sucess Modal
export const TOGGLE_CONTACT_SUCCESS_MODAL = 'TOGGLE_CONTACT_SUCCESS_MODAL';
export const toggleContactSuccessModal = () => ({
  type : TOGGLE_CONTACT_SUCCESS_MODAL
}); 

// Submit Support Ticket
export const sendSupportTicket = info => dispatch => {
  const url = process.env.REACT_APP_ROOT_URL + '/contact';
  const payload = JSON.stringify(info);
  const request = new Request(url, {
    method: 'POST',
    body: payload,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include'
  });
  let emailSent;
  return fetch(request)
  .then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong while sending support email');
      console.log(error);
      response.json()
      .then(response => {
        dispatch(setErrors(response));
      });
    } else {
      dispatch(toggleContactSuccessModal());
    }
  })
}

// Set User Dicipline Selection
export const diciplineSelection = (user, dicipline) => dispatch => {
  console.log('selecting dicipline');
  const url = process.env.REACT_APP_ROOT_URL + '/dicipline-selection';
  const info = {
    user: user,
    dicipline: dicipline
  };
  const payload = JSON.stringify(info);
  const request = new Request(url, {
    method: 'PUT',
    body: payload,
    headers: {
      "Content-Type": "application/json"
    },
    credentials: 'include'
  });
  return fetch(request)
  .then(response => {
    if (!response.ok) {
      const error = new Error('Something went wrong while setting user dicipline selection');
        console.log(error);
    }
    return response.json();
  })
  .then(response => {
    dispatch(enterUserState(response));
  })
  .catch(error => console.log(error));
}
