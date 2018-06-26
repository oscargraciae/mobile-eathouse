import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Platform
} from 'react-native';
import Swiper from 'react-native-swiper';
import Dimensions from 'Dimensions';

class Home extends React.Component {
  
  getWidth() {
    return Dimensions.get('window').width;
  }

  render() {
    const width = this.getWidth();
    return (
      <ImageBackground
        style={styles.imageContainer}
        source={require('../images/background-home.png')}
      >
        <StatusBar barStyle="light-content" />

        <Image source={ require('../images/logo-full-white.png')} resizeMode="contain" style={styles.logo} />
        <Text style={styles.title}>Saludable y delicioso directo a tu casa u oficina.</Text>

        <Swiper 
          style={styles.wrapper}
          showsButtons={false}
          autoplay
          autoplayTimeout={4}
          containerStyle={{width}}
          dot={<View style={{backgroundColor: '#FFF', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3, opacity: 0.3}} />}
          activeDot={<View style={{backgroundColor: '#FFF', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
        >
          <View style={styles.slider}>
            <Text style={styles.textTitle}>Elige tu comida</Text>
            <Text style={styles.textDescription}>Selecciona de una variedad de platillos que tenemos disponibles.</Text>
          </View>
          <View style={styles.slider2}>
            <Text style={styles.textTitle}>Ordena o programa</Text>
            <Text style={styles.textDescription}>Ordena tus platillos o programa por adelantado para la semana. Disponible de Lunes a Viernes.</Text>
          </View>
          <View style={styles.slider3}>
            <Text style={styles.textTitle}>Disfruta tu comida</Text>
            <Text style={styles.textDescription}>Tu orden será entregada a la puerta de tu casa u oficina entre 12:30 pm y la 1:30 pm</Text>
          </View>
        </Swiper>

        <View style={styles.containerButtons}>
          <TouchableOpacity style={[styles.buttonContainer]} onPress={() => this.props.navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>CREAR CUENTA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonContainer, styles.buttonSecondary]} onPress={() => this.props.navigation.navigate('Login')}>
            <Text style={styles.buttonText}>INICIAR SESION</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonDefault} onPress={this.handlePressLogin}>
            <Text style={styles.buttonDefaultText}>Ver zonas de entrega disponibles</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: '#ccc',
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
    color: '#FFF',
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
    backgroundColor: Colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 4,
    width: 300,
    marginTop: 20,
  },
  buttonSecondary: {
    backgroundColor: '#757575',
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
  }
})

export default Home;