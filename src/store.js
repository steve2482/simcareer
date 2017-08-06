import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './js/reducers/reducers';

export default createStore(reducers.simCareerReducer, applyMiddleware(thunk));