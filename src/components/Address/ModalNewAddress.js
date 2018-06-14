import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import Modal from "react-native-modal";
import Ionicon from 'react-native-vector-icons/Ionicons';

import AddressForm from './AddressForm';

class ModalNewAddress extends React.Component {



  render() {
    return (
      <Modal
        isVisible={this.props.show}
        style={styles.modal}
        backdropColor={"#FFFFFF"}
        backdropOpacity={1}
        supportedOrientations={['portrait', 'landscape']}
      >
        <View style={styles.modalHeader}>
          {/* <TouchableOpacity style={styles.btnBack} onPress={this.onPressClose} >
            <Ionicon name="md-close" size={30} style={styles.backEncBtn}/>
          </TouchableOpacity> */}
          
        </View>
        <View style={styles.addressForm}>
          <Text style={styles.title}>¡INGRESA TU DIRECCIÓN Y EMPIZA A ORDENAR!</Text>
          <AddressForm {...this.props} onClose={false} toggle={this.props.onToggle}/>
        </View>
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
  modalHeader: {
    flexDirection: 'row',
    paddingVertical: 0,
    height: 70,
    paddingTop: 20,
    backgroundColor: Colors.ColorBase,
  },
  addressForm: {
    flex: 1,
  },
  btnBack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  backEncBtn: {
    color: '#333',
    marginHorizontal: 10,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  btnContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    paddingVertical: 15,
    borderColor: '#DDD',
    alignItems: 'center',
  },
  btnTextContainer: {
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  title: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }
});

export default ModalNewAddress;