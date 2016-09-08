import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import reducer from './reducers/index';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import { loadEmbeddedData } from './actions';
const logger = createLogger({ collapsed: true, duration: true, colors: { action: function() { return 'white'; }} });
const store = createStore(reducer, applyMiddleware(thunk, promise, logger));

injectTapEventPlugin();

// pull json data off the dom and bootstrap
var embeddedData = JSON.parse(document.getElementById('embeddedData').text)
if (embeddedData) {
    store.dispatch(loadEmbeddedData(embeddedData));
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
