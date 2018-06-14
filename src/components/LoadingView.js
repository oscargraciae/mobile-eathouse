import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import Colors from '../config/Colors';

function LoadingView() {
  return (
    <ActivityIndicator size="large" style={styles.loading} color={Colors.primary}/>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  }
})

export default LoadingView;