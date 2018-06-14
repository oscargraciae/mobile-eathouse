import React from 'react';
import {
  View,
  Text,
  FlatList
} from 'react-native';

// import componentes
import AddressItem from './AddressItem';

class AddressList extends React.Component {

  _keyExtractor = (item, index) => item.id.toString();

  _renderItem = ({ item }) => {
    return (
      <AddressItem {...item} userAddressId={this.props.userAddressId} selected={this.props.selected} />
    )
  }

  render() {
    return (
      <FlatList 
        data={this.props.data}
        renderItem={this._renderItem}
        keyExtractor={this._keyExtractor}
        ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#e8ebe9' }} />}
      />
    )
  }
}

export default AddressList;