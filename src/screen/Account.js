//import liraries
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Alert
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

// import local libraries
import Colors from '../config/Colors';
import { logout } from '../actions/authentication';

// create a component
class Account extends Component {

  _okPress = () => {
    this.props.logout();
  }
  onPressLogout = () => {
    Alert.alert('Aviso', '¿Seguro deseas cerrar sesión?', [
      {text: 'Si, seguro', onPress: this._okPress},
      {text: 'No, regresar', onPress: this._cancelPress},
    ]);
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar />
        {/* <View style={styles.headerNav}>
          <Text style={styles.name}>Oscar Gracia</Text>
          <Text style={styles.createdAt}>aquivacorreo@gmail.com</Text>
          <Text style={styles.createdAt}>Usuario desde: Martes 4 abril 2018</Text>
        </View> */}
        <View style={styles.optionsNav}>
          <TouchableOpacity style={styles.option} onPress={() => this.props.navigation.navigate('Orders')}>
            <Ionicon name="ios-paper-outline" size={20} color={Colors.secondaryText} />
            <Text style={styles.optionText}>Mis ordenes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => this.props.navigation.navigate('Schedule')}>
            <Ionicon name="ios-calendar-outline" size={20} color={Colors.secondaryText} />
            <Text style={styles.optionText}>Mi agenda</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={() => this.props.navigation.navigate('AvailableZone', { onlyMap: true })}>
            <Ionicon name="ios-navigate-outline" size={20} color={Colors.secondaryText} />
            <Text style={styles.optionText}>Zona de cobertura</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={this.onPressLogout}>
            <Ionicon name="ios-power" size={20} color={Colors.secondaryText} />
            <Text style={styles.optionText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  headerNav: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  name: {
    fontWeight: 'bold',
    color: Colors.primaryText,
    fontSize: 18,
  },
  createdAt: {
    color: Colors.secondaryText,
  },
  option: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    padding: 15,
  },
  optionText: {
    color: Colors.primaryText,
    paddingLeft: 10,
  }
});

//make this component available to the app
export default connect(null, { logout })(Account);
