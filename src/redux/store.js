import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import rootReducer from './root-reducer';
import createSagaMiddleWare from 'redux-saga';
import {fetchCollectionsStart} from './shop/shop.sagas';

const sagaMiddleWare = createSagaMiddleWare();

const middlewares = [sagaMiddleWare];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleWare.run(fetchCollectionsStart);

export const persistor = persistStore(store);

export default {store, persistStore};