//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// import local libraries
import api from '../config/api';

// import components
import OrderList from '../components/Orders/OrderList';

// create a component
class Orders extends Component {

  state = {
    orders: null,
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const orders = await api.orders.getAll();
    this.setState({ orders });
  }

  orderPress = (item) => {
    // console.log("ONPRESS!!");
    this.props.navigation.navigate('OrderDetail', { item });
  }

  render() {
    const { orders } = this.state;
    return (
      <View style={styles.container}>
        { orders && <OrderList data={orders} onPress={this.orderPress} /> }
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
});

//make this component available to the app
export default Orders;
