//import liraries
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  ScrollView,
} from 'react-native';

// import local libraries
import api from '../config/api';
import { formatDate } from '../utils/formatDate';
import { moneyThousand } from '../utils/formatNumber';

// import components
import LoadingView from '../components/LoadingView';
import OrderDetailItem from '../components/Orders/OrderDetailItem';

// create a component
class OrderDetail extends Component {

  state = {
    order: null,
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const { item } = this.props.navigation.state.params;
    const order = await api.orders.getDetail(item.id);
    console.log("Order---->", order);
    this.setState({ order });
  }

  render() {
    const { item } = this.props.navigation.state.params;
    const { order } = this.state;
    
    if(!order) {
      return (
        <LoadingView />
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.name}>Orden #{item.id}</Text>
          <Text style={styles.createdAt}>Fecha de compra: { formatDate(item.created_at)}</Text>
        </View>
        <ScrollView style={styles.scrollContent}>
          <Text style={styles.contentTitle}>Resumen: </Text>
          { order.map((item, index) => {
            return (
              <View style={styles.content} key={item.id}>
                <OrderDetailItem {...item} />
              </View>
            )
          }) }

          <Text style={styles.contentTitle}>Costos: </Text>
          <View style={styles.content}>
            <View style={styles.contentItemPrice}>
              <Text>Subtototal</Text>
              <Text>${moneyThousand(item.subtotal)} MX</Text>
            </View>
            <View style={styles.contentItemPrice}>
              <Text>Costo de envío</Text>
              <Text>$0 MX</Text>
            </View>
            <View style={styles.contentItemPrice}>
              <Text style={{ fontWeight: 'bold' }}>Total</Text>
              <Text style={{ fontWeight: 'bold' }}>${moneyThousand(item.total)} MX</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  name: {
    fontWeight: 'bold',
    color: Colors.primaryText,
    fontSize: 18,
  },
  createdAt: {
    color: Colors.secondaryText,
  },
  scrollContent: {
    
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
  }
});

//make this component available to the app
export default OrderDetail;
