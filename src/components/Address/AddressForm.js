import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// import libraries
import validation from '../../validations/address';
import api from '../../config/api';

// import components
import InputAddress from '../Address/InputAddress';

class AddressForm extends React.Component {

  state = {
    isAutocomplete: true,
    street: '',
    area: '',
    zipcode: '',
    city: '',
    state: '',
    addressMap: '',
    description: '',
    lat: 0,
    lng: 0,
    errors: {},
    isLoading: false,
  }

  onSuggestSelect = (data, details = null) => {
    console.log(data, details);
    const { lat, lng } = details.geometry.location;
    this.setState({ isAutocomplete: false, addressMap: data.description, lat, lng }, () => {
      this.fillInAddress(details);
    });
  }

  onSubmit = async () => {
    console.log("Guardando...", this.state);
    if(this.isValid()) {
      this.setState({ isLoading: true });
      const response = await api.user.createAddress(this.state);
      console.log("Respuesta---->", response);
      const { ok, address } = response;
      
      if(ok) {
        this.setState({ isLoading: false }); 
        if(this.props.toggle) {
          this.props.toggle();
        }
      } else {
        console.log("Ha ocurrido un error");
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

  fillInAddress = (place) => {
    var componentForm = {
      locality: 'long_name',
      administrative_area_level_1: 'long_name',
    };

    for (var i = 0; i < place.address_components.length; i++) {
      var addressType = place.address_components[i].types[0];
      if (componentForm[addressType]) {
        console.log("Componetedsds--->", componentForm[addressType]);
        console.log(addressType);
        var val = place.address_components[i][componentForm[addressType]];
        // let name = document.getElementById(addressType).name;
        if(addressType === 'locality') {
          this.setState({ city: val });
        } else if(addressType === 'administrative_area_level_1') {
          this.setState({ state: val });
        }
      }
    }
  }

  render() {
    const { errors, isLoading } = this.state;
    return (
      <View style={styles.container}>
        { this.state.isAutocomplete ?
          <View style={styles.autocomplete}>
            <GooglePlacesAutocomplete
              placeholder='Escribe la dirección (Colonia, Ciudad, Estado)'
              minLength={2}
              autoFocus={false}
              returnKeyType={'default'}
              fetchDetails={true}
              query={{
                key: 'AIzaSyA-yTAH4cD5Lq3VDwysl-Me5bBek1phNBY',
                language: 'es',
              }}
              onPress={this.onSuggestSelect}
              styles={{
                textInputContainer: {
                  backgroundColor: '#FFF',
                  borderTopWidth: 0,
                  borderBottomWidth:0
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  height: 38,
                  color: '#5d5d5d',
                  fontSize: 16
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                },
              }}
              currentLocation={false}
            />
          </View> :
          <View style={styles.formContent}>
            <TouchableOpacity onPress={() => this.setState({ isAutocomplete: true })}>
              <Text style={styles.input}>{this.state.addressMap}</Text>
            </TouchableOpacity>
            <TextInput style={styles.input}
              placeholder="Calle y No."
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={(street) => this.setState({ street })}
              placeholderTextColor={Colors.primaryText} 
            />
            { errors.street && <Text style={styles.error}>{errors.street}</Text> }
  
            <TextInput style={styles.input}
              placeholder="Colonia"
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={(area) => this.setState({ area })}
              placeholderTextColor={Colors.primaryText} 
            />
            { errors.area && <Text style={styles.error}>{errors.area}</Text> }
  
            <TextInput style={styles.input}
              placeholder="Codigo Postal"
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={(zipcode) => this.setState({ zipcode })}
              placeholderTextColor={Colors.primaryText} 
            />
            { errors.zipcode && <Text style={styles.error}>{errors.zipcode}</Text> }
            
            <TouchableOpacity style={styles.buttonContainer} onPress={this.onSubmit}>
              { !isLoading && <Text style={styles.buttonText}>GUARDAR</Text>}
              { isLoading && <Text style={styles.buttonText}>CARGANDO...</Text>}
            </TouchableOpacity>

            { !this.props.onClose &&
              <TouchableOpacity style={styles.buttonDefault} onPress={this.props.toggle}>
                <Text style={styles.buttonDefaultText}>CANCELAR</Text>
              </TouchableOpacity>
            }
            
          </View>
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  autocomplete: {
    flex: 1,
  },
  input: {
    width: 300,
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
  }
})

export default AddressForm;
