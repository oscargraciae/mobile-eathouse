import React from 'react';
import {
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Login from '../screen/Login';
import Tabs from '../routes/Tabs';
import Checkout from '../screen/Checkout';
import NewAddress from '../screen/NewAddress';

const Root = StackNavigator({ 
  // Login: {
  //   screen: Login,
  //   navigationOptions: {
  //     header: null,
  //   }
  // },
  Tabs: {
    screen: Tabs
  },
  Checkout: {
    screen: Checkout,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Tu carrito de compra',
      headerLeft: (
        <TouchableHighlight style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicon name="md-arrow-back" size={25} color="#333" />
        </TouchableHighlight>
      )
    })
  },
  NewAddress: {
    screen: NewAddress,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Nueva dirección',
      headerLeft: (
        <TouchableHighlight style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicon name="md-arrow-back" size={25} color="#333" />
        </TouchableHighlight>
      )
    })
  },
}, { 
  initialRouteName: 'Tabs',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#FFF',
      borderColor: 'red',
      shadowColor: '#FFF',
      borderBottomWidth: 0,
    },
    headerTintColor: '#333',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }
});

const styles = StyleSheet.create({
  btnBack: {
    marginLeft: 10,
  }
});

export default Root;