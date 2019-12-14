import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/rootReduce';
import thunk from 'redux-thunk';

const middleware = [thunk];
const initState = {};

const store = createStore(
  rootReducer,
  initState,
  compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() || compose)
);
export default store;