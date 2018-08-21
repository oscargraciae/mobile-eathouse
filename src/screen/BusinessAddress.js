import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
	Alert,
	Picker,
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import Ionicon from 'react-native-vector-icons/Ionicons';

// import libraries
import validation from '../validations/address-business';
import api from '../config/api';
import { isPointAvailable } from '../utils/geospatial';

const latitudeDelta = 0.00522;
const longitudeDelta = 0.00522;
class BusinessAddress extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Empresa Afiliada',
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
		business: [],
		businessId: 0,
	}
	
	componentDidMount() {
		this.initialFetch();
	}

	async initialFetch() {
		const businessList = [];
		const business = await api.business.getAll();
		console.log("bus-->", business);
		business.map((item) => businessList.push({ value: item.id,  label: item.name}));
    this.setState({ business: businessList });
	}

  onSubmit = async () => {
    if(this.isValid()) {
      this.setState({ isLoading: true });
      const response = await api.user.createAddressWithBusiness(this.state);
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

  render() {
    const { errors, isLoading } = this.state;
    return (
      <ScrollView style={styles.container}>
				<Text>Si trabajas en una empresa afiliada a eathouse registra la siguiente información para que puedas aprovechar los descuentos y promociones que tenemos para ti.</Text>
        <View style={styles.formContent}>
					<Dropdown
            label='Seleccion...'
            data={this.state.business}
            onChangeText={(businessId) => this.setState({ businessId })}
          />

					{ errors.businessId && <Text style={styles.error}>{errors.businessId}</Text> }

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
export default BusinessAddress;
