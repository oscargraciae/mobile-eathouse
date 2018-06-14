import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

export default () => {
  return (
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
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      styles={{
        textInputContainer: {
          backgroundColor: 'red',
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
  )
}