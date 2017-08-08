import * as actions from '../actions/actions.js';
import update from 'immutability-helper';

const appState = {
  showLogin: false,
  showRegister: false,
  errors: null,
  isValidPassword: true,
  user: null,
  idIsValid: true
};

export const simCareerReducer = (state=appState, action) => {
  // Toggle Login Modal
  if (action.type === actions.TOGGLE_LOGIN_MODAL) {
    let showLogin = state.showLogin;
    const newAppState = update(state, {showLogin: {$set: !showLogin}});
    return newAppState;
  }

  // Toggle Register Modal
  if (action.type === actions.TOGGLE_REGISTER_MODAL) {
    let showRegister = state.showRegister;
    const newAppState = update(state, {showRegister: {$set: !showRegister}});
    return newAppState;
  }

  // Enter User State
  if (action.type === actions.ENTER_USER_STATE) {
    const newAppState = update(state, {user: {$set: action.user}});
    return newAppState;
  }

  // Set Id Is Valid
  if (action.type === actions.ID_IS_VALID) {
    const newAppState = update(state, {idIsValid: {$set: action.boolean}});
    return newAppState;
  }

  // Set Errors
  if (action.type === actions.SET_ERRORS) {
    const newAppState = update(state, {errors: {$set: action.errors}});
    return newAppState;
  }

  // Set Valid Password
  if (action.type === actions.SET_VALID_PASSWORD) {
    const newAppState = update(state, {isValidPassword: {$set: action.boolean}});
    return newAppState;
  }

  return state;
}