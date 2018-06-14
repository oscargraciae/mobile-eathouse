import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Conekta from 'react-native-conekta';
// import { Co } from 'react-native-conekta';

import validation from '../../validations/credit-card';
import api from '../../config/api';

class CreditCardForm extends React.Component {

  state = {
    name: '',
    creditCardNumber: '',
    creditCardNumberFormat: '',
    monthEx: '',
    yearEx: '',
    dateFormat: '',
    cvv: '',
    token: '',
    errors: {},
    isLoading: false,
  }

  onSubmit = () => {
    if(this.isValid()) {
      this.setState({ isLoading: true });
      var conektaApi = new Conekta();
      conektaApi.setPublicKey("key_JEnHKPz6vGyz5rmzC75F6hg");
      const { name, creditCardNumber, monthEx, yearEx, cvv } = this.state;
      
      conektaApi.createToken({
        cardNumber: creditCardNumber,
        name: name,
        cvc: cvv,
        expMonth: monthEx,
        expYear: yearEx,
      }, async (data) => {
        console.log( 'DATA:', data ); // data.id to get the Token ID
        if(data.object === 'error') {
          Alert.alert('Aviso', `Hubo un error al agregar este método de pago. Verifica los datos e inténtalo de nuevo o usa un método de pago distinto: ${data.message_to_purchaser}`);  
        } else {
          const response = await api.creditCard.create({ token: data.id });
          this.props.onCloseForm();
        }
        
        this.setState({ isLoading: false });
      }, (error) => {
        console.log("Error al generar el token", error);
        Alert.alert('Aviso', `Hubo un error al agregar este método de pago. Verifica los datos e inténtalo de nuevo o usa un método de pago distinto: ${error.message_to_purchaser}`);
        this.setState({ isLoading: false });
      });

      // Conekta.Token.create(tokenParams, async (token) => { // Suceess
      //   const response = await api.creditCard.create({ token: token.id });
      //   this.setState({ isLoading: false });
      // }, (error) => { // Error
      //   console.log("Error al generar el token", error);
      //   this.setState({ isLoading: false, errorMessage: `Hubo un error al agregar este método de pago. Verifica los datos e inténtalo de nuevo o usa un método de pago distinto: ${error.message_to_purchaser}` });
      // });
    }
  }

  isValid() {
    const { errors, isValid } = validation(this.state);
    if(!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

//   isValid() {
//     let valid = this.myDateText.isValid();
//     let rawValue = this.myDateText.getRawValue();

//     console.log("Datos de input-->", valid, rawValue);
// }

  onChangeTextCard = (text) => {
    const number = text.replace(/\s/g, '');
    this.setState({ creditCardNumberFormat: text, creditCardNumber: number });
  }

  onChangeTexDate = (text) => {
    const dates = text.split('/');
    console.log("Dates", dates);
    this.setState({ dateFormat: text, monthEx: dates[0], yearEx: dates[1]  });
  }

  render() {
    const { errors, isLoading } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.formContent}>  
            <Text style={styles.inputLabel}>Nombre como aparece en la tarjeta</Text>
            <TextInput style={styles.input}
              placeholder=""
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={(name) => this.setState({ name })}
              placeholderTextColor="#DDD"
            />
            { errors.name && <Text style={styles.error}>{errors.name}</Text> }

            <Text style={styles.inputLabel}>Número de tarjeta</Text>
            <TextInputMask
                refInput={(ref) => this.myDateText = ref}
                type={'credit-card'}
                // onChangeText={(name) => this.setState({ name })}
                onChangeText={this.onChangeTextCard}
                value={this.state.creditCardNumberFormat}
                style={styles.input}
                maxLength={19}
                placeholder=""
            />
            { errors.creditCardNumber && <Text style={styles.error}>{errors.creditCardNumber}</Text> }
  
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.inputLabel}>Fecha de vencimiento</Text>
                <TextInputMask
                  refInput={(ref) => this.myDate = ref}
                  type={'datetime'}
                  options={{
                    format: 'DD/MM'
                  }}
                  // onChangeText={(name) => this.setState({ name })}
                  onChangeText={this.onChangeTexDate}
                  value={this.state.dateFormat}
                  style={styles.input}
                  placeholder="MM/AA"
                  maxLength={5}
                />
                { errors.monthEx && <Text style={styles.error}>{errors.monthEx}</Text> }
                { errors.yearEx && <Text style={styles.error}>{errors.yearEx}</Text> }
              </View>

              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text style={styles.inputLabel}>CVV</Text>
                <TextInput style={styles.input}
                  placeholder="CVV"
                  returnKeyType="next"
                  autoCapitalize="none"
                  onChangeText={(cvv) => this.setState({ cvv })}
                  placeholderTextColor="#DDD"
                  maxLength={4}
                />
                { errors.cvv && <Text style={styles.error}>{errors.cvv}</Text> }
              </View>
 
              
            </View>
            
            <TouchableOpacity style={styles.buttonContainer} onPress={this.onSubmit}>
              { !isLoading && <Text style={styles.buttonText}>GUARDAR</Text>}
              { isLoading && <Text style={styles.buttonText}>CARGANDO...</Text>}
            </TouchableOpacity>

            { !this.props.onClose &&
              <TouchableOpacity style={styles.buttonDefault} onPress={this.props.onCloseForm}>
                <Text style={styles.buttonDefaultText}>CANCELAR</Text>
              </TouchableOpacity>
            }
            
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
  },
  autocomplete: {
    flex: 1,
  },
  input: {
    // width: 300,
    width: '100%',
    backgroundColor:'#ffffff',
    paddingVertical: 10,
    fontSize:16,
    color: Colors.primaryText,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  inputLabel: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    backgroundColor: Colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 4,
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
    marginBottom: 20,
    fontSize: 11,
  }
})

export default CreditCardForm;