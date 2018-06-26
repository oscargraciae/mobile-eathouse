import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Modal from "react-native-modal";
import Ionicon from 'react-native-vector-icons/Ionicons';

// import local libraries
import api from '../../config/api';

// import components
import AddressList from '../Address/AddressList';
import AddressForm from '../Address/AddressForm';

class AddressModalList extends React.Component {

  state = {
    address: null,
    isNewAddress: false,
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const address = await api.user.getAddress();
    this.setState({ address });
  }

  onPressClose = () => {
    this.setState({ isNewAddress: false });
    this.props.toggle();
  }

  onAfterSubmit = () => {
    this.initialFetch();
    this.setState({ isNewAddress: false });
  }

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
          <TouchableOpacity style={styles.btnBack} onPress={this.onPressClose} >
            <Ionicon name="md-close" size={30} style={styles.backEncBtn}/>
          </TouchableOpacity>
        </View>
        { !this.state.isNewAddress ?
          <View style={styles.modalContent}>
            { this.state.address && <AddressList data={this.state.address} {...this.props} /> }
            <TouchableOpacity style={styles.btnContainer} onPress={() => this.setState({ isNewAddress: true })}>
              <Text style={styles.btnTextContainer}>NUEVA DIRECCIÓN</Text>
            </TouchableOpacity>
          </View> :
          <View style={styles.addressForm}>
            <AddressForm {...this.props} onAfterSubmit={this.onAfterSubmit} />
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
})

export default AddressModalList;