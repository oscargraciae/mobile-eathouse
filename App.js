/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AsyncStorage,
  UIManager,
} from 'react-native';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
// import createExpirationTransform from 'redux-persist-transform-expire';

// import local libraries
import store from './src/redux/store';

// import components
// import Root from './src/routes/App';
import AuthNavigation from './src/routes/AuthNavigation';
import LoadingView from './src/components/LoadingView';

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

class App extends Component {

  state = {
    ready: false,
  }

   componentDidMount() {
    // const expireTransform = createExpirationTransform({
    //   expireKey: 'persistExpiresAt',
    //   defaultState: {
    //     data: [],
    //   }
    // });
    persistStore(
      store, {
        storage: AsyncStorage,
        // whitelist: [ 'authentication', 'cart' ],
        whitelist: [ 'authentication' ],
        // transforms: [expireTransform]
      }, () => this.setState({ ready: true })
    );
  }

  render() {
    if (!this.state.ready) {
      return <LoadingView />;
    }
    
    return (
      <Provider store={store}>
        <AuthNavigation store={store} />
      </Provider>
    );
  }
}

export default App;