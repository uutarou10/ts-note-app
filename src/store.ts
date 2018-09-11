import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './module';

export const history = createBrowserHistory();

export default createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(applyMiddleware(
    routerMiddleware(history),
    thunk
  ))
);