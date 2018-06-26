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
import CreditCardList from '../CreditCard/CreditCardList';
import CreditCardForm from '../CreditCard/CreditCardForm';

class CreditCardModal extends React.Component {

  state = {
    creditCards: [],
    isNewCard: false,
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const creditCards = await api.creditCard.getAll();
    this.setState({ creditCards });
  }

  onCloseForm = () => {
    this.initialFetch();
    this.setState({ isNewCard: false });
  }

  onPressClose = () => {
    this.setState({ isNewAddress: false });
    this.props.toggle();
  }

  render() {
    console.log("Cards->", this.state.creditCards);
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
        { (this.state.isNewCard || this.state.creditCards.length === 0) ?
          <View style={styles.form}>
            <CreditCardForm onCloseForm={this.onCloseForm} />
          </View> :
          <View style={styles.modalContent}>
          <Text style={{ fontWeight: 'bold', paddingLeft: 10, marginBottom: 20, fontSize: 16 }}>Selecciona un método de pago</Text>
          { this.state.creditCards.length > 0 && <CreditCardList data={this.state.creditCards} {...this.props} /> }
            <TouchableOpacity style={styles.btnContainer} onPress={() => this.setState({ isNewCard: true })}>
              <Text style={styles.btnTextContainer}>AÑADIR UNA NUEVA TARJETA</Text>
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
  modalHeader: {
    flexDirection: 'row',
    paddingVertical: 0,
    height: 70,
    paddingTop: 20,
    backgroundColor: Colors.ColorBase,
  },
  form: {
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
  inputBox: {
    width:300,
    backgroundColor:'#ffffff',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize:16,
    color:'#8d8d8d',
    marginVertical: 10,
  },
  loginButton:{
    width:300,
    backgroundColor: '#94d522',
    borderRadius:28,
    paddingHorizontal: 16,
    marginVertical: 15,
    paddingVertical: 16,
    // ios
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: {
        height: 2,
        width: 0
    },
    // android
    elevation: 8,
  },
  buttonText: {
    fontSize:18,
    fontWeight:'normal',
    color:'#ffffff',
    textAlign:'center'
  },
  titleBoxText: {
    fontWeight:'300',
    paddingBottom: 20,
    fontSize: 18,
  },
  btnContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    paddingVertical: 15,
    borderColor: '#DDD',
    alignItems: 'center',
    backgroundColor: Colors.secondary,
  },
  btnTextContainer: {
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
})

export default CreditCardModal;