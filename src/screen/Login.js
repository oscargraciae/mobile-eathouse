//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TextInput, KeyboardAvoidingView, Image, StatusBar, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { connect } from 'react-redux';

// import local libraries
import Colors from '../config/Colors';
import api from '../config/api';
import validation from '../validations/login';
import { login } from '../actions/authentication';
import { setUser } from '../actions/user';


// create a component
class Login extends Component {

  state = {
    email: '',
    password: '',
    errors: {},
    isLoading: false,
  }

  login = async () => {
    if(this.isValid()) { 
      this.setState({ isLoading: true });
      const { email, password } = this.state;
      const response = await api.user.authentication(email, password);
      
      const { ok, user } = response;
      if(ok) {
        console.log("USER-->", user)
        this.setState({ isLoading: false });
        this.props.login(user.token);
        const us = await api.user.get(user.id);
        this.props.setUser(us);
        // this.props.navigation.navigate('Menu'); 
      } else {
        Alert.alert('Aviso', "Verifica tu correo y contraseña", [ {text: 'Aceptar'} ] );
        this.setState({ isLoading: false });
      }

    }    
  }

  isValid() {
    const { errors, isValid } = validation(this.state);
    if(!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  render() {
    const { errors, isLoading } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.loginTop}>
          <Text style={styles.titleText}>Bienvenido</Text>
        </View>
        <View style={styles.loginForm}>
          <TextInput style={styles.input}
            placeholder="Correo eletronico"
            returnKeyType="next"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(email) => this.setState({ email })}
            placeholderTextColor={Colors.primaryText} 
          />
          { errors.email && <Text style={styles.error}>{errors.email}</Text> }

            <TextInput style={styles.input}
              placeholder="Contraseña"
              returnKeyType="next"
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(password) => this.setState({ password })}
              placeholderTextColor={Colors.primaryText} 
            />
            { errors.password && <Text style={styles.error}>{errors.password}</Text> }

          <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
            {
              isLoading ? <Text style={styles.buttonText}>CARGANDO...</Text> :
              <Text style={styles.buttonText}>ENTRAR</Text>
            }
          </TouchableOpacity>
          
          {/* <TouchableOpacity style={styles.buttonDefault} onPress={this.handlePressLogin}>
            <Text style={styles.buttonDefaultText}>¿No tienes cuenta? Registrate</Text>
          </TouchableOpacity> */}
          
        </View>
      </ScrollView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  logo: {
    width: 200,
    height: 100,
  },
  titleText: {
    color: Colors.primaryText,
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitleText: {
    color: Colors.secondaryText,
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 60,
  },
  loginTop: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loginForm: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  input: {
    width: '100%',
    backgroundColor:'#ffffff',
    paddingVertical: 10,
    fontSize:16,
    color: Colors.primaryText,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  buttonContainer: {
    backgroundColor: Colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 4,
    width: '100%',
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700'
  },
  buttonDefault: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    width: 300,
    marginTop: 30,
  },
  buttonDefaultText: {
    textAlign: 'center',
    color: '#333',
    fontWeight: '700'
  },
  error: {
    color: 'red',
    textAlign: 'left',
    width: 300,
  }
});


export default connect(null, { login, setUser })(Login);
