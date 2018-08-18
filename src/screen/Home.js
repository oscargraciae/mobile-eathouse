import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform,
  Linking
} from 'react-native';
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions';

import Colors from '../config/Colors';

class Home extends React.Component {
  
  getWidth() {
    return Dimensions.get('window').width;
  }

  render() {
    const width = this.getWidth();
    return (
      <View
        style={styles.imageContainer}
        source={require('../images/background-home.png')}
      >
        <StatusBar barStyle="light-content" />

        <Image source={ require('../images/logo-eathouse.png')} resizeMode="contain" style={styles.logo} />
        <Text style={styles.title}>Comidas ricas y saludables, entregadas directamente a la puerta de tu oficina. </Text>

        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={[styles.buttonContainer, styles.buttonFacebook]} onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>INICIAR SESIÓN CON FACEBOOK</Text>
          </TouchableOpacity> */}
          <View style={{ width: 300, alignItems: 'center', paddingVertical: 10 }}>
            <Text>o</Text>
          </View>
          <TouchableOpacity style={[styles.buttonContainer, styles.buttonSecondary]} onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>CREAR UNA CUENTA</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://eathouse.mx/privacy')}>
            <Text style={styles.notes}>Al registrarte, confirmas que aceptas los Términos y condiciones y la Política de privacidad.</Text>
          </TouchableOpacity>
          
          

          {/* <TouchableOpacity style={styles.buttonDefault} onPress={() => this.props.navigation.navigate('AvailableZone', { onlyMap: true })}>
            <Text style={styles.buttonDefaultText}>Ver zonas de entrega disponibles</Text>
          </TouchableOpacity> */}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    marginTop: 20,
  },
  title: {
    color: Colors.primaryText,
    fontSize: Platform.OS === 'ios' ? 21 : 16,
    paddingHorizontal: 20,
    textAlign: 'center',
  },
  containerButtons: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 4,
    width: 320,
    marginTop: 5,
  },
  buttonSecondary: {
    backgroundColor: '#757575',
  },
  buttonFacebook: {
    backgroundColor: 'rgb(37,80,151)',
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700'
  },
  buttonDefault: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: 300,
  },
  buttonDefaultText: {
    textAlign: 'center',
    color: '#FFF',
    fontWeight: '700',
    fontSize: Platform.OS === 'ios' ? 14 : 12,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  slider2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  slider3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  textTitle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 16 : 14,
    paddingVertical: 15,
  },
  textDescription: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: Platform.OS === 'ios' ? 16 : 12,
  },
  notes: {
    fontSize: 12,
    textAlign: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  }
})

export default Home;