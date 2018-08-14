import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

// import libraries
import validation from '../../validations/address';
import api from '../../config/api';
import { isPointAvailable } from '../../utils/geospatial';

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
    phone: '',
    notes: '',
    lat: 0,
    lng: 0,
    errors: {},
    isLoading: false,
    addressNotAvailable: false,
  }

  onSuggestSelect = (data, details = null) => {
    console.log(data, details);
    const { lat, lng } = details.geometry.location;
    if(isPointAvailable([lng, lat])) {
      this.setState({ isAutocomplete: false, addressMap: data.description, lat, lng, addressNotAvailable: false }, () => {
        this.fillInAddress(details);
      });
    } else {
      this.setState({ userLocation: [lat, lng], address: '' });
      Alert.alert('Aviso', 'Lo sentimos, aún no realizamos entregas en tu dirección. Para ver las zonas de cobertura accede desde las opciones de tu cuenta.');
    }
    
  }

  onSubmit = async () => {
    if(this.isValid()) {
      this.setState({ isLoading: true });
      const response = await api.user.createAddress(this.state);
      const { ok, address } = response;
      
      if(ok) {
        this.setState({ isLoading: false }); 
        this.props.onAfterSubmit();
        // if(this.props.toggle) {
        //   this.props.toggle();
        // }
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
        var val = place.address_components[i][componentForm[addressType]];
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
      <ScrollView style={styles.container}>
        { this.state.isAutocomplete ?
          <View style={styles.autocomplete}>
            <GooglePlacesAutocomplete
              placeholder='Escribe la dirección (Colonia, Ciudad, Estado)'
              minLength={2}
              autoFocus
              returnKeyType={'default'}
              fetchDetails={true}
              // nearbyPlacesAPI="None"
              query={{
                key: 'AIzaSyA-yTAH4cD5Lq3VDwysl-Me5bBek1phNBY',
                language: 'es',
                components: 'country:mx'
              }}
              onPress={this.onSuggestSelect}
              styles={{
                textInputContainer: {
                  backgroundColor: '#FFF',
                  borderTopWidth: 0,
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  color: '#5d5d5d',
                  fontSize: 16
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                },
              }}
              currentLocation={false}
              currentLocationLabel="Ubicación actual"
              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
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
              placeholder="Teléfono"
              returnKeyType="next"
              autoCapitalize="none"
              keyboardType="numeric"
              onChangeText={(phone) => this.setState({ phone })}
              placeholderTextColor={Colors.primaryText} 
            />
            { errors.phone && <Text style={styles.error}>{errors.phone}</Text> }

            <TextInput style={styles.input}
              placeholder="Datos adicionales (Opcional)"
              returnKeyType="next"
              autoCapitalize="none"
              onChangeText={(notes) => this.setState({ notes })}
              placeholderTextColor={Colors.primaryText}
            />
            
            <TouchableOpacity style={styles.buttonContainer} onPress={this.onSubmit}>
              { !isLoading ? <Text style={styles.buttonText}>GUARDAR</Text> : isLoading && <Text style={styles.buttonText}>CARGANDO...</Text> }
            </TouchableOpacity>

            { this.props.onClose &&
              <TouchableOpacity style={styles.buttonDefault} onPress={this.props.toggle}>
                <Text style={styles.buttonDefaultText}>CANCELAR</Text>
              </TouchableOpacity>
            }    
          </View>
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF',
  },
  autocomplete: {
    flex: 1,
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
