import React from 'react';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';


import Colors from '../config/Colors';

import Menu from '../screen/Menu';
import Account from './Account';

const Tabs = TabNavigator({
  Menu: {
    screen: Menu,
    navigationOptions: {
      // headerTitle: 'Menu',
      header: null,
      tabBarLabel: 'Menu',
      tabBarIcon: ({ focused, tintColor }) => {
        return <Ionicon name='ios-restaurant' size={25} color={tintColor} />;
      }
    }
  },
  Account: {
    screen: Account,
    navigationOptions: {
      header: null,
      tabBarLabel: null,
      tabBarIcon: ({ focused, tintColor }) => {
        return <Ionicon name='ios-contact' size={25} color={tintColor} />;
      }
    }
  }
}, {
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: false,
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.secondaryText,
    activeBackgroundColor: '#FFF',
    inactiveBackgroundColor: '#FFF',
    
    style: {
      backgroundColor: '#FFF',
      borderColor: 'red',
      shadowColor: '#FFF',
    }
  },
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#FFFFFF',
    },
    headerTintColor: 'red',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
});

export default Tabs;