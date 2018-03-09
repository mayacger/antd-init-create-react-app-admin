import React, { Component } from 'react';

import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

import RoutePage from './route';

const middleware = [thunk];
const store = createStore(reducer, applyMiddleware(...middleware));

class App extends Component {
  render() {
    return (
			<Provider store={store}>
          <RoutePage store={store} />
      </Provider>
    );
  }
}

export default App;
