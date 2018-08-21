import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../config/Colors';


class AddressHome extends React.Component {
	static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Nueva dirección',
      // headerLeft: (
      //   <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.goBack()}>
      //     <Ionicon name="md-arrow-back" size={25} color="#333" />
      //   </TouchableOpacity>
      // ),
      headerLeft: null,
    }
	};
	
	render() {
		return (
			<View>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('NewAddress')}>
					<View style={styles.containerBox}>
						<Ionicon name="ios-pin" size={20} color={Colors.primaryText} style={{ paddingRight: 10 }} />
						<Text style={styles.btnText}>Ingresa una nueva dirección</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.props.navigation.navigate('BusinessAddress')}>
					<View style={styles.containerBox}>
						<Icon name="building" size={20} color={Colors.primaryText} style={{ paddingRight: 10 }} />
						<View>
							<Text style={styles.btnText}>Servicio a empresas afiliadas</Text>
							<Text style={{ fontSize: 12, color: '#79776B', paddingTop: 5, paddingRight: 10 }}>Esta opción es para personas que trabajan en alguna empresa afiliada a eathouse.</Text>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EFEFEF',
	},
	containerBox: {
		backgroundColor: '#FFF',
		paddingHorizontal: 12,
		paddingVertical: 15,
		marginTop: 10,
		borderTopWidth: 1,
		borderTopColor: '#DDD',
		borderBottomWidth: 1,
		borderBottomColor: '#DDD',

		alignItems: 'center',
		flexDirection: 'row',
	},
	btnText: {
		color: Colors.primaryText,
	}
});

export default AddressHome;