import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Modal from 'react-modal'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import App from '../imports/ui/App';
import appReducers from '../imports/ui/reducers';
import './main.html';

const middleware = []

if (Meteor.isProduction) {
	middleware.push(thunk);
}else{
	middleware.push(thunk, logger);
}

const store = createStore(appReducers, applyMiddleware(...middleware));

Meteor.startup(() => {
	Modal.setAppElement(document.getElementById("app"));
	render(<Provider store={store}>
      <App />
    </Provider>, document.getElementById("app"));
});
