import * as actions from '../actions/actions.js';
import update from 'immutability-helper';

const appState = {
  showLogin: false,
  showRegister: false
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
  return state;
}