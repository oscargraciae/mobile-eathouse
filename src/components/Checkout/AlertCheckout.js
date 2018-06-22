// import libraries
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Modal from "react-native-modal";
import Ionicon from 'react-native-vector-icons/Ionicons';

// Parametros de entrada --> Title, description, Estatus

class AlertCheckout extends React.Component {
  render() {
    const { statusCheckout, errorMessage } = this.props;
    console.log("statusCheckout", statusCheckout);
    return (
      <Modal
        isVisible={this.props.show}
        style={styles.modal}
        backdropColor={"#FFFFFF"}
        backdropOpacity={1}
        supportedOrientations={['portrait', 'landscape']}
      >
        { statusCheckout === 0 ?
          <View style={[styles.modalContent, styles.success]}>
            <Ionicon name="ios-checkmark-circle-outline" size={140} color="#FFF" />
            <Text style={styles.title}>ORDEN CONFIRMADA</Text>
            <Text style={styles.subtitle}>Gracias por tu orden, vamos a preparar tus platillos con mucho <Ionicon name="md-heart" size={15} /> </Text> 
            <TouchableOpacity style={styles.buttonContainer} onPress={this.props.paymentSuccess}>
              <Text style={styles.buttonText}>ACEPTAR</Text>
            </TouchableOpacity>
          </View> :
          <View style={[styles.modalContent, styles.error]}>
            <Ionicon name="ios-close-circle-outline" size={140} color="#FFF" />
            <Text style={styles.title}>Oops! :(</Text>
            <Text style={styles.subtitle}>{errorMessage}</Text> 
            <TouchableOpacity style={styles.buttonContainer} onPress={this.props.toggle}>
              <Text style={styles.buttonText}>ACEPTAR</Text>
            </TouchableOpacity>
          </View>
        } 
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  modalContent: {
    backgroundColor: '#EFEFEF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  title: {
    color: '#FFF',
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  success: {
    backgroundColor: '#3BCF75',
  },
  error: {
    backgroundColor: '#ca3b27',
  },
  buttonContainer: {
    backgroundColor: '#3BCF75',
    borderWidth: 1,
    borderColor: '#FFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 4,
    width:250,
    marginTop: 80,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: '700'
  },
})

export default AlertCheckout;