import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import * as reducers from './js/reducers/reducers';

const createStoreWithMiddleware = compose(applyMiddleware(thunk))(createStore)(reducers.simCareerReducer);

export default createStoreWithMiddleware;