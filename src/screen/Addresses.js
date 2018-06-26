import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  WebView
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

class Addresses extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Seleccionar dirección',
      headerLeft: (
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
          <Ionicon name="md-arrow-back" size={25} color="#333" />
        </TouchableOpacity>
      ),
      // headerLeft: null,
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Cambiar de dirección</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  message: {
    fontSize: 16,
    padding: 20,
    fontWeight: 'bold',
  },
  btnCart: {
    backgroundColor: Colors.secondary,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCartText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  }
})

export default Addresses;