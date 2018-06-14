import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet
} from 'react-native';

// import components
import CreditCardItem from '../CreditCard/CreditCardItem';

class CreditCardList extends React.Component {

  _keyExtractor = (item, index) => item.id.toString();

  _renderItem = ({ item }) => {
    return (
      <CreditCardItem {...item} creditCardId={this.props.creditCardId} selected={this.props.selected} />
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

export default CreditCardList;