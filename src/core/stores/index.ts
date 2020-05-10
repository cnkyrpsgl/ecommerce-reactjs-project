import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { ReducersMapObject } from 'redux';
import createSagaMiddleware, { Saga } from 'redux-saga';

import reactotron from '@/core/dev/reactotronConfig';
import { reducerRegistry, sagasRegistry } from '@/core/registry';

// @ts-ignore
const sagaMonitor = reactotron ? reactotron.createSagaMonitor() : undefined;
// @ts-ignore
const enhancers = reactotron ? [reactotron.createEnhancer()] : undefined;
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const store = configureStore({
  reducer: combineReducers(reducerRegistry.getReducers()),
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
  enhancers,
});

reducerRegistry.setChangeListener((reducers: ReducersMapObject): void => {
  store.replaceReducer(combineReducers(reducers));
});

sagasRegistry.setChangeListener((sagas: Saga[]): void => {
  sagas.map(sagaMiddleware.run);
});

export default store;
