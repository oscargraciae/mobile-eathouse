//import liraries
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import InputAddress from '../components/Address/InputAddress';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

// create a component
class NewAddress extends Component {
  
  render() {
    return (
      <InputAddress />
      // <GooglePlacesAutocomplete
      //     placeholder='Enter Location'
      //     minLength={2}
      //     autoFocus={false}
      //     returnKeyType={'default'}
      //     fetchDetails={true}
      //     query={{
      //       key: 'AIzaSyA-yTAH4cD5Lq3VDwysl-Me5bBek1phNBY',
      //       language: 'es',
      //     }}
      //     onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
      //       console.log(data, details);
      //     }}
      //     styles={{
      //       textInputContainer: {
      //         backgroundColor: 'rgba(0,0,0,0)',
      //         borderTopWidth: 0,
      //         borderBottomWidth:0
      //       },
      //       textInput: {
      //         marginLeft: 0,
      //         marginRight: 0,
      //         height: 38,
      //         color: '#5d5d5d',
      //         fontSize: 16
      //       },
      //       predefinedPlacesDescription: {
      //         color: '#1faadb'
      //       },
      //     }}
      //     currentLocation={false}
      //   />
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default NewAddress;
