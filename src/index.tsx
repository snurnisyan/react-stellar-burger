import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import {Provider} from 'react-redux';
import {rootReducer} from './services/reducers';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import {socketMiddleware} from "./services/middleware/socketMiddleware";
import {wsActions, wsAuthActions} from "./services/actions/wsActions";
import {wsUrl} from "./utils/constans";
import { createRoot } from 'react-dom/client';


/*const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;*/

const enhancer = composeWithDevTools(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsUrl, wsAuthActions)));
export const store = createStore(rootReducer, enhancer);

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
