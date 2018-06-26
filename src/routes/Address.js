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

import AvailableZone from '../screen/AvailableZone';
import NewAddress from '../screen/NewAddress';
import Addresses from '../screen/Addresses';

const address = StackNavigator({
  NewAddress: {
    screen: NewAddress,
  },
  Addresses: {
    screen: Addresses,
  },
  AvailableZone: {
    screen: AvailableZone,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});

const styles = StyleSheet.create({
  btnBack: {
    marginLeft: 10,
  }
});

export default address;