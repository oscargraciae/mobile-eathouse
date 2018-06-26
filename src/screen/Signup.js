//import liraries
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

// import local libraries
import Colors from '../config/Colors';
import api from '../config/api';
import validation from '../validations/signup';
import { login } from '../actions/authentication';


// create a component
class Signup extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    errors: {},
    isLoading: false,
    errorsServer: null,
  }

  login = async () => {
    if(this.isValid()) { 
      this.setState({ isLoading: true });

      const res = await api.user.create(this.state);
      console.log("Res-->", res);
      console.log("Respuesta--->", res.ok);
      if(res.ok) {
        const { email, password } = this.state;
        const response = await api.user.authentication(email, password);
        const { ok, user } = response;
        if(ok) {
          console.log("Datos de usuario.>", user);
          this.props.login(user.token);
          this.props.navigation.navigate('Menu'); 
        }        
      } else {
        this.setState({ errorsServer: res.errors, isLoading: false });
      }
      // this.setState({ isLoading: false });
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
    const { errors, isLoading, errorsServer } = this.state;
    return (
      // <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <ScrollView style={styles.container}>
        {/* <Image source={ require('../images/hero-edit-2.jpg')} resizeMode="contain" style={styles.logo} /> */}
        <View style={styles.loginForm}>
          <TextInput style={styles.input}
            autoFocus
            placeholder="Nombre"
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={(firstName) => this.setState({ firstName })}
            placeholderTextColor={Colors.primaryText} 
          />
          { errors.firstName && <Text style={styles.error}>{errors.firstName}</Text> }
          <TextInput style={styles.input}
            placeholder="Apellido"
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={(lastName) => this.setState({ lastName })}
            placeholderTextColor={Colors.primaryText} 
          />
          { errors.lastName && <Text style={styles.error}>{errors.lastName}</Text> }
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

            { errorsServer && 
              <View>
                <Text>{errorsServer}</Text>
              </View>
            }
          <TouchableOpacity style={styles.buttonContainer} onPress={this.login}>
            {
              isLoading ? <Text style={styles.buttonText}>CARGANDO...</Text> :
              <Text style={styles.buttonText}>CREAR</Text>
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
    paddingHorizontal: 10,
  },
  logo: {
    width: '100%',
    height: 130,
    backgroundColor: 'red',
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
    // justifyContent: 'center',
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


export default connect(null, { login })(Signup);
