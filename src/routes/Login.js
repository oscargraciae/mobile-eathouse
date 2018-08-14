import React from 'react';
import {
  TouchableHighlight,
  StyleSheet
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Login from '../screen/Login';
import Sigunp from '../screen/Signup';
import Home from '../screen/Home';
import AvailableZone from '../screen/AvailableZone';
import MenuPublic from '../screen/MenuPublic';

const LoginNav = StackNavigator({ 
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    }
  },
  AvailableZone: {
    screen: AvailableZone,
  },
  MenuPublic: {
    screen: MenuPublic,
    navigationOptions: {
      header: null,
    }
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Iniciar sesión',
      headerLeft: (
        <TouchableHighlight style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicon name="md-arrow-back" size={25} color="#333" />
        </TouchableHighlight>
      )
    })
  },
  Signup: {
    screen: Sigunp,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Crear cuenta',
      headerLeft: (
        <TouchableHighlight style={styles.btnBack} onPress={() => navigation.goBack()}>
          <Ionicon name="md-arrow-back" size={25} color="#333" />
        </TouchableHighlight>
      )
    })
  },
}, { 
  initialRouteName: 'Home',
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

export default LoginNav;