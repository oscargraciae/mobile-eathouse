//import liraries
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
import { connect } from 'react-redux';

// import local libraries
import Colors from '../config/Colors';
import { moneyThousand } from '../utils/formatNumber';
import api from '../config/api';
import { clearCart } from '../actions/cart';

// import components
import CheckoutItem from '../components/Checkout/CheckoutItem';
import LoadingView from '../components/LoadingView';
import AddressModalList from '../components/Checkout/AddressModalList';
import CreditCardModal from '../components/Checkout/CreditCardModal';
import AlertCheckout from '../components/Checkout/AlertCheckout';

// create a component
class Checkout extends Component {

  state = {
    creditCardId: 0,
    userAddressId: 0,
    addressSelected: null,
    creditCardSelected: null,
    isOpenModalAddress: false,
    isOpenModalCreditCard: false,
    isLoading: true,
    checkoutAlert: false,
    statusCheckout: 0,
    isSendingOrder: false,
    creditCards: [],
    methodPayment: 1,
    paymentChange: 0,
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const [address, creditCards] = await Promise.all([
      api.user.getAddress(),
      api.creditCard.getAll(),
    ]);

    if(creditCards.length > 0) {
      this.setState({ 
        isLoading: false, 
        addressSelected: address[0],
        userAddressId: address[0].id,
        creditCardSelected: creditCards[0],
        creditCardId: creditCards[0].id,
        creditCards,
      });
    } else {
      this.setState({ 
        isLoading: false, 
        addressSelected: address[0],
        userAddressId: address[0].id,
        isOpenModalCreditCard: false,
        creditCards,
      });
    }
  }

  sendOrder = async () => {
    const { methodPayment } = this.state;
    this.setState({ isSendingOrder: true });
    
    switch (methodPayment) {
      case 1:
        this.orderCard();
        break;
      case 2:
        this.orderCash();
      default:
        break;
    }
  }

  _toggelModalAddress = () => {
    this.setState({ isOpenModalAddress: !this.state.isOpenModalAddress });
  }

  _toggelModalCreditCard = () => {
    this.setState({ isOpenModalCreditCard: !this.state.isOpenModalCreditCard });
  }

  _toggleAlertCheckout = () => {
    this.setState({ checkoutAlert: !this.state.checkoutAlert });
  }

  _selectedAddress = (address) => {
    this.setState({ addressSelected: address, userAddressId: address.id, isOpenModalAddress: false });
  }

  _selectedCreditCard = (creditCard) => {
    this.setState({creditCardSelected: creditCard, creditCardId: creditCard.id, isOpenModalCreditCard: false });
  }

  paymentSuccess = () => {
    this.setState({ checkoutAlert: false });
    this.props.navigation.navigate('Menu');
  }

  async orderCard() {
    console.log("Pagado con tarjeta");

    const { userAddressId, creditCardId } = this.state;
    const { data } = this.props.cart;

    let isDiscount = false;
    let quantityTotal = 0;
    if (data.length > 0) {
      data.map((item, i) => {
        quantityTotal = quantityTotal + item.quantity;
      });

      if(quantityTotal >= 5 || this.props.user.bussinesId) {
        isDiscount = true;
      }
    }

    const order = {
      userAddressId,
      creditCardId,
      deviceType: 'mobile',
      paymentMethod: 1,
      paymentChange: 0,
      isDiscount: isDiscount,
      orderDetails: data,
    }
    console.log("Datos enviados-->", order);
    const response = await api.orders.create(order);
    console.log("Respuesta save--->", response);
    if(response.ok) {
      this.setState({ isSendingOrder: false, checkoutAlert: true, statusCheckout: 0 }, () => {
        this.props.clearCart();
      });
    } else {
      const { details } = response.err;
      console.log("Respuesta de error payment--->",  details[0].message);
      this.setState({ paymentError:  details[0].message, checkoutAlert: true, isSendingOrder: false, statusCheckout: 1 });
    }
  }

  async orderCash() {
    console.log("Pagado con efectivo!");

    const { userAddressId, paymentChange } = this.state;
    const { data } = this.props.cart;

    let isDiscount = false;
    let quantityTotal = 0;
    if (data.length > 0) {
      data.map((item, i) => {
        quantityTotal = quantityTotal + item.quantity;
      });

      if(quantityTotal >= 5 || this.props.user.bussinesId) {
        isDiscount = true;
      }
    }

    const order = {
      userAddressId,
      deviceType: 'mobile',
      paymentMethod: 2,
      paymentChange,
      isDiscount: isDiscount,
      orderDetails: data,
    }
    console.log("Datos enviados-->", order);
    const response = await api.orders.createCash(order);
    console.log("Respuesta save--->", response);
    if(response.ok) {
      this.setState({ isSendingOrder: false, checkoutAlert: true, statusCheckout: 0 }, () => {
        this.props.clearCart();
      });
    } else {
      const { details } = response.err;
      console.log("Respuesta de error payment--->",  details[0].message);
      this.setState({ paymentError:  details[0].message, checkoutAlert: true, isSendingOrder: false, statusCheckout: 1 });
    }
  }

  render() {
    const { addressSelected, creditCardSelected } = this.state;
    const { user } = this.props;
    console.log("USer props-->", user);
    let total = 0;
    let subtotal = 0;
    let discount = 0;
    let quantityTotal = 0;

    this.props.cart.data.map((item, i) => {
      subtotal = subtotal + item.total;
    });
    if (user.bussinesId) {
      discount = subtotal * 0.20;
    }

    if (this.props.cart.data.length > 0) {
      this.props.cart.data.map((item, i) => {
        quantityTotal = quantityTotal + item.quantity;
      });
  
      if(quantityTotal >= 5) {
        discount = subtotal * 0.20;
      }
    }

    total = subtotal - discount;

    const { data } = this.props.cart;

    if(this.state.isLoading) {
      return (
        <LoadingView />
      )
    }

    return (
      <View style={styles.container}>
        { user.bussinesId &&
          <View style={styles.alertBox}>
            <Text style={styles.alertBoxText}>Por formar parte de {user.bussine.name} tienes el 20% de descuento en todos tus pedidos</Text>
          </View>
        }
        { !user.bussinesId &&
          <View style={styles.alertBox}>
            <Text style={styles.alertBoxText}>Obtén un 20% de descuento en la compra de 5 platillos o más.</Text>
          </View>
        }
        { this.state.isOpenModalAddress && <AddressModalList show={this.state.isOpenModalAddress} toggle={this._toggelModalAddress} userAddressId={this.state.userAddressId} selected={this._selectedAddress} navigate={this.props.navigation.navigate} {...this.props} /> }
        { this.state.isOpenModalCreditCard && <CreditCardModal show={this.state.isOpenModalCreditCard} toggle={this._toggelModalCreditCard} creditCardId={this.state.creditCardId} selected={this._selectedCreditCard} navigate={this.props.navigation.navigate} /> }
        { this.state.checkoutAlert && <AlertCheckout show={this.state.checkoutAlert} statusCheckout={this.state.statusCheckout} errorMessage={this.state.paymentError} toggle={this._toggleAlertCheckout} paymentSuccess={this.paymentSuccess} /> }
        <ScrollView>
          <View style={styles.containerBox}>
            <Text style={styles.containerTitle}>Dirección de entrega</Text>
            { addressSelected && <Text style={styles.containerDescription}>{addressSelected.street}, {addressSelected.addressMap}</Text> }
            <TouchableOpacity style={styles.btnContainer} onPress={() => this.setState({ isOpenModalAddress: true })}>
              <Text style={styles.btnTextContainer}>CAMBIAR DIRECCIÓN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.containerBox}>
            <Text style={styles.containerTitle}>Resumen</Text>
            { data.map((item, index) => {
              return (
                <CheckoutItem {...item} key={index} />
              )
            }) }
          </View>
          <View style={styles.containerBox}>
            <Text style={styles.containerTitle}>Método de Pago</Text>
            <View style={styles.methodControls}>
              <TouchableOpacity style={[styles.methodControlBtn, (this.state.methodPayment == 1 && { borderColor: Colors.primary })]} onPress={() => this.setState({ methodPayment: 1 })}>
                <Text style={(this.state.methodPayment == 1 && { color: Colors.primary })}>Tarjeta de crédito/debito</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.methodControlBtn, (quantityTotal < 5 ? styles.methodControlBtnDisabled : null), (this.state.methodPayment == 2 && { borderColor: Colors.primary })]} onPress={() => this.setState({ methodPayment: 2 })} disabled={quantityTotal < 5}>
                <Text style={[(quantityTotal < 5 && { color: '#DDDDDD' }), (this.state.methodPayment == 2 && { color: Colors.primary })]}>Efectivo</Text>
              </TouchableOpacity>
            </View>
            { this.state.methodPayment === 1 &&
              <View>
                { creditCardSelected && <Text style={styles.containerDescription}>{creditCardSelected.brand} **** **** **** {creditCardSelected.last4}</Text> }
                <TouchableOpacity style={styles.btnContainer} onPress={() => this.setState({ isOpenModalCreditCard: true })}>
                  <Text style={styles.btnTextContainer}>{this.state.creditCards.length === 0 ? 'AGREGAR MÉTODO DE PAGO' : 'CAMBIAR TARJETA' } </Text>
                </TouchableOpacity>
              </View>
            }
            { this.state.methodPayment === 2 &&
              <View>
                <Text style={styles.inputLabel}>¿Cambio de cuanto?</Text>
                <Text>Escribe cuanto vas a pagar en efectivo para envíar tu cambio.</Text>
                <TextInput style={styles.input}
                  placeholder="0 MXN"
                  returnKeyType="next"
                  autoCapitalize="none"
                  onChangeText={(paymentChange) => this.setState({ paymentChange })}
                  placeholderTextColor="#DDD"
                />
              </View>
            }
            <Text style={{ fontSize: 12, color: '#79776B' }}>*El pago en efectivo está disponible en la compra de 5 platillos o más</Text>
          </View>
          <View style={styles.containerBox}>
            <Text style={styles.containerTitle}>Horario de entrega</Text>
            <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>12:30pm - 1:30pm</Text>
            <Text style={{ fontSize: 12, color: '#79776B' }}>*Actualmente solo contamos con este horario de entrega</Text>
          </View>
          
          <View style={styles.content}>
            <View style={styles.contentItemPrice}>
              <Text>Subtotal</Text>
              <Text>${moneyThousand(subtotal)} MX</Text>
            </View>
            <View style={styles.contentItemPrice}>
              <Text>Costo de envío</Text>
              <Text>GRATIS</Text>
            </View>
            { user.bussinesId &&
              <View style={styles.contentItemPrice}>
                <Text>Descuento</Text>
                <Text>-${discount} MX</Text>
              </View>
            }
            { quantityTotal >= 5 &&
              <View style={styles.contentItemPrice}>
                <Text>Descuento</Text>
                <Text>-${discount} MX</Text>
              </View>
            }
            <View style={styles.contentItemPrice}>
              <Text style={{ fontWeight: 'bold' }}>Total</Text>
              <Text style={{ fontWeight: 'bold' }}>${moneyThousand(total)} MX</Text>
            </View>
          </View>
        </ScrollView>
        { this.state.methodPayment === 1 &&
          <View style={[styles.btnCart, (!this.state.creditCardId || !this.state.userAddressId) || this.state.isSendingOrder ? styles.disabled : null]}>
            <TouchableOpacity onPress={this.sendOrder} disabled={(!this.state.creditCardId || !this.state.userAddressId) || this.state.isSendingOrder}>
              { this.state.isSendingOrder ? <Text style={styles.btnCartText}>ENVIANDO ORDEN...</Text> : <Text style={styles.btnCartText}>ORDENAR</Text> }
            </TouchableOpacity>
          </View>
        }
        { this.state.methodPayment === 2 &&
          <View style={[styles.btnCart, (this.state.paymentChange < total  || !this.state.userAddressId) || this.state.isSendingOrder ? styles.disabled : null]}>
            <TouchableOpacity onPress={this.sendOrder} disabled={(this.state.paymentChange < total  || !this.state.userAddressId) || this.state.isSendingOrder}>
              { this.state.isSendingOrder ? <Text style={styles.btnCartText}>ENVIANDO ORDEN...</Text> : <Text style={styles.btnCartText}>ORDENAR</Text> }
            </TouchableOpacity>
          </View>
        }

      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerBox: {
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  methodControls: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  methodControlBtn: {
    borderWidth: 1,
    padding: 12,
    marginRight: 5,
    borderRadius: 3,
  },
  methodControlBtnDisabled: {
    borderColor: '#DDDDDD',
  },
  input: {
    // width: 300,
    width: '100%',
    backgroundColor:'#ffffff',
    paddingVertical: 10,
    fontSize:16,
    color: Colors.primaryText,
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  inputLabel: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  containerTitle: {
    color: Colors.primaryText,
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
  },
  containerDescription: {
    color: Colors.secondaryText,
  },
  btnContainer: {
    marginTop: 15,
    borderTopWidth: 1,
    paddingVertical: 15,
    borderColor: '#DDD',
    alignItems: 'flex-end',
  },
  btnTextContainer: {
    fontWeight: 'bold',
    color: Colors.secondary,
    fontSize: 12,
  },
  btnCart: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCartText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  content: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#e8ebe9',
    paddingHorizontal: 15,
  },
  contentTitle: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontWeight: 'bold',
  },
  contentItemPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  disabled: {
    backgroundColor: '#a1a7b0'
  },
  alertBox: {
    backgroundColor: '#FEC828',
    padding: 10,
  },
  alertBoxText: {
    color: '#42413E',
  }
});

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
  }
}

export default connect(mapStateToProps, { clearCart })(Checkout);
