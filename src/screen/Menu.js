// import liraries
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import decode from 'jwt-decode';

// import local libraries
import api from '../config/api';
import { addToCart } from '../actions/cart';
import Colors from '../config/Colors';
import { formatDateString, getDateSumDays, getMomentDate } from '../utils/formatDate';

// import components
import List from '../components/Menu/List';
import Calendar from '../components/Menu/Calendar';

// create a component
class Menu extends Component {

  state = {
    dishes: null,
    user: null,
    total: 0,
    deliveryDate: null,
    isLoading: true,
    showModaladdress: false,
    isLater: false,
  }

  componentDidMount() {
    this.initialFetch();
    const currentTime = formatDateString(new Date(Date.now()), 'HH:mm');

    if(currentTime > "11:00") {
      let newDate = getDateSumDays(new Date(Date.now()), 'YYYY/MM/DD', 1);
      let date = getMomentDate(newDate);
      if(date.day() === 6) {
        newDate = getDateSumDays(new Date(Date.now()), 'YYYY/MM/DD', 3);
      } else if(date.day() === 0) {
        newDate = getDateSumDays(new Date(Date.now()), 'YYYY/MM/DD', 2);
      }

      this.setState({ deliveryDate: newDate });
    } else {
      const newDate = formatDateString(new Date(Date.now()), 'YYYY/MM/DD');
      this.setState({ deliveryDate: newDate, isLater: true });
    }

    this.setState({ isLoading: false });
  }

  changeDay = (deliveryDate) => {
    const newDate =  formatDateString(deliveryDate, 'YYYY/MM/DD');
    this.setState({ deliveryDate: newDate });
  }

  async initialFetch() {
    const tokenDecode = decode(this.props.authentication.token);
    const [ dishes, user ] = await Promise.all([
      api.dish.getAll(),
      api.user.get(tokenDecode.id),
    ]);

    this.setState({ dishes, user, showModaladdress: !user.withAddress });
    
    if(!user.withAddress) {
      this.props.navigation.navigate('NewAddress');
    }
  }

  addCart = (dish, quantity) => {
    const { deliveryDate } = this.state;
    this.props.addToCart(dish, quantity, deliveryDate);
  }

  navigationCheckout = () => {
    this.props.navigation.navigate('Checkout');
  }
  
  onToggleAddress = () => {
    this.setState({ showModaladdress: !this.state.showModaladdress });
  }

  render() {
    let total = 0;
    this.props.cart.data.map((item, i) => {
      total = total + item.total;
    });
    return (
      <View style={styles.container}>
        { !this.state.isLater ?
          <View style={styles.alertBox}>
            <Text style={styles.alertBoxText}>Ordena tus platillos para el día de mañana o planifica tu semana.</Text>
          </View> :
          <View style={styles.alertBox}>
            <Text style={styles.alertBoxText}>¡Todavía estas a tiempo! Los pedidos para entregar hoy cierran a las 11:00am</Text>
          </View>
        }
        { this.state.deliveryDate && <Calendar deliveryDate={this.state.deliveryDate} changeDay={this.changeDay} /> }
        { this.state.dishes && <List data={this.state.dishes} addCart={this.addCart} deliveryDate={this.state.deliveryDate} /> }
        { this.props.cart.data.length > 0 &&
          <View style={styles.btnCart}>
            <TouchableOpacity onPress={this.navigationCheckout}>
              <Text style={styles.btnCartText}>VER CARRITO ${total}MX</Text>
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
    paddingTop: 20,
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
  alertBox: {
    backgroundColor: '#3BCF75',
    padding: 10,
  },
  alertBoxText: {
    color: '#FFF',
  }
});

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    authentication: state.authentication
  }
};

export default connect(mapStateToProps, { addToCart })(Menu);
