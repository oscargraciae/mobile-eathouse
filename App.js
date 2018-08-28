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
import OneSignal from 'react-native-onesignal';

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

  componentWillMount() {
    OneSignal.init("ca55c3ba-aa54-4824-8c7f-52c2b17b6ee3");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  componentDidMount() {
    persistStore(
      store, {
        storage: AsyncStorage,
        whitelist: [ 'authentication' ],
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