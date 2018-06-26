import React from 'react';
import {
  View,
  Text,
  WebView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Colors from '../config/Colors';

class AvailableZone extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Zona de cobertura',
      headerLeft: (
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
          <Ionicon name="md-arrow-back" size={25} color="#333" />
        </TouchableOpacity>
      ),
    }
  };

  render() {
    console.log("Propedades--->", this.props.navigation);
    const { onlyMap } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        { !onlyMap && <Text style={styles.message}>Lo sentimos, aún no realizamos entregas en tu dirección.</Text> }
        <WebView
          source={{uri: 'https://eathouse.mx/map-available'}}
          style={{backgroundColor: '#FFF', flex: 1 }}
        />
        { !onlyMap &&
          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.btnCart}>
            <Text style={styles.btnCartText}>PROBAR CON OTRA DIRECCÓN</Text>
          </TouchableOpacity>
        }
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

export default AvailableZone;