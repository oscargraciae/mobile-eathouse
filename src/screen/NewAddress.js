import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView,{ PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Ionicon from 'react-native-vector-icons/Ionicons';

// import libraries
import validation from '../validations/address';
import api from '../config/api';
import { isPointAvailable } from '../utils/geospatial';

const latitudeDelta = 0.00522;
const longitudeDelta = 0.00522;
class NewAddress extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Nueva dirección',
      headerLeft: (
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
          <Ionicon name="md-arrow-back" size={25} color="#333" />
        </TouchableOpacity>
      ),
      // headerLeft: null,
    }
  };

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
    isViewMap: true,
    region: {
      latitude: null,
      longitude: null,
      latitudeDelta: null,
      longitudeDelta: null,
    },
  }

  // componentWillMount() {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log("Datos de ubicacion--->", position);
  //     const { latitude, longitude } = position.coords;
  //     // const region = getRegionForCoordinates([{ latitude, longitude }, {latitude: Number(item.lat), longitude: Number(item.lng)}]);
  //     const region = { latitude: Number(latitude), longitude: Number(longitude), latitudeDelta, longitudeDelta };
  //     this.setState({ region, lat: latitude, lng: longitude });
  //   });

  //   console.log("Antes", this.state)
  // }

  onSuggestSelect = (data, details = null) => {
    console.log(data, details);
    const { lat, lng } = details.geometry.location;
    const region = { latitude: Number(lat), longitude: Number(lng), latitudeDelta: latitudeDelta, longitudeDelta: longitudeDelta };
    this.setState({ addressMap: data.description, lat, lng, region }, () => {
      this.fillInAddress(details);
    });
  }

  onConfirmLocation = () => {
    const { lat, lng } = this.state;
    if(isPointAvailable([lng, lat])) {
      this.setState({ isAutocomplete: false, isViewMap: false, addressNotAvailable: false });
    } else {
      this.setState({ userLocation: [lat, lng], address: '' });
      Alert.alert('Aviso', 'Lo sentimos, aún no realizamos entregas en tu dirección.', [
        {text: 'Ver cobertura', onPress: () => this.props.navigation.navigate('AvailableZone', { onlyMap: true })},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }

  onSubmit = async () => {
    if(this.isValid()) {
      this.setState({ isLoading: true });
      const response = await api.user.createAddress(this.state);
      const { ok, address } = response;
      
      if(ok) {
        this.setState({ isLoading: false }); 
        // this.props.navigation.goBack();
        this.props.navigation.replace("Tabs");

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
        // let name = document.getElementById(addressType).name;
        if(addressType === 'locality') {
          this.setState({ city: val });
        } else if(addressType === 'administrative_area_level_1') {
          this.setState({ state: val });
        }
      }
    }
  }

  onRegionChange = region => {
    this.setState({ region });
  }

  render() {
    const { errors, isLoading } = this.state;
    const { region, lat, lng, deliveryTime } = this.state;
    if(this.state.isViewMap) {
      return (
        <View style={styles.autocomplete}>
            <GooglePlacesAutocomplete
              placeholder='Escribe la dirección (Colonia, Ciudad, Estado)'
              minLength={2}
              autoFocus={true}
              enablePoweredByContainer={false}
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
                container: {
                  position: 'absolute',
                  top: 10, 
                  zIndex: 2,
                  backgroundColor: '#FFFFFF',
                  width: 350,
                  left: '5%',
                  width: '90%',
                },
                textInputContainer: {
                  backgroundColor: '#FFF',
                  borderTopWidth: 0,
                },
                description: {
                  fontSize: 12,
                },
                textInput: {
                  marginLeft: 0,
                  marginRight: 0,
                  color: '#5d5d5d',
                  fontSize: 14
                },
                predefinedPlacesDescription: {
                  color: '#1faadb',
                  fontSize: 21,
                },
              }}
              currentLocation={false}
              currentLocationLabel="Ubicación actual"
              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
            />
            <View style={styles.mapContainer}>
              {region.latitude &&
                <View style={{ flex: 1 }}>
                  <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    region={region}
                    scrollEnabled
                    zoomEnabled
                    onRegionChangeComplete={this.onRegionChange}
                    rotateEnabled={false}
                  />
                <View pointerEvents="none" style={styles.markerFixed}>
                  <Ionicon name="ios-pin" size={40} color="red" />
                </View>

                <TouchableOpacity style={styles.buttonContainerFixed} onPress={this.onConfirmLocation}>
                  <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            }
          </View>
        </View>
      )
    }

    return (
      <ScrollView style={styles.container}>    
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
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex:1,
  },
  marker: {
    height: 48,
    width: 48
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%'
  },
  buttonContainerFixed: {
    position: 'absolute',
    bottom: 10,
    left: '5%',
    width: '90%',
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
});

//make this component available to the app
export default NewAddress;
