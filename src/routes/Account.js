import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';

// import screens
import Account from '../screen/Account';
import Orders from '../screen/Orders';
import OrderDetail from '../screen/OrderDetail';
import Schedule from '../screen/Schedule';


const account = StackNavigator({
  Account: {
    screen: Account,
    navigationOptions: {
      headerTitle: 'Cuenta',
      header: null,
    }
  },
  Orders: {
    screen: Orders,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Mis ordenes',
      headerLeft: (
        <TouchableHighlight style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicon name="md-arrow-back" size={25} color="#333" />
        </TouchableHighlight>
      )
    })
  },
  OrderDetail: {
    screen: OrderDetail,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Resumen de mi orden',
      headerLeft: (
        <TouchableHighlight style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicon name="md-arrow-back" size={25} color="#333" />
        </TouchableHighlight>
      )
    })
  },
  Schedule: {
    screen: Schedule,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Mi agenda',
      headerLeft: (
        <TouchableHighlight style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicon name="md-arrow-back" size={25} color="#333" />
        </TouchableHighlight>
      )
    })
  },
}, {
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

export default account;