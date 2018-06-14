import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';

// import components
import MenuItem from './MenuItem';


class MenuList extends Component {

  _keyExtractor = (item, index) => item.id.toString();

  _renderItem = ({ item }) => {
    return (
     <MenuItem item={item} addCart={this.props.addCart} deliveryDate={this.props.deliveryDate} />
    )
  }

  render() {
    const { data } = this.props;
    return (
      <FlatList 
        data={data}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#e8ebe9' }} />}
      />
    )
  }
}

export default MenuList;