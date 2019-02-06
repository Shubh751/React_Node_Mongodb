import reducer from './reducers/reducer.js';

import { createStore,applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas.js';

const Saga = createSagaMiddleware();

const store =  createStore(reducer,applyMiddleware(Saga));
Saga.run(rootSaga);

export default store;
