import React from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';

// import component
import OrderItem from '../Orders/OrderItem';

class OrderList extends React.Component {

  _keyExtractor = (item, index) => item.id.toString();

  _renderItem = ({ item }) => {
    return (
      <OrderItem {...item} onPress={this.props.onPress} />
    )
  }

  render() {
    console.log("Props-->", this.props);
    return (
      <FlatList 
        data={this.props.data}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        style={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#e8ebe9' }} />}
      />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#FFF',
  }
})

export default OrderList;