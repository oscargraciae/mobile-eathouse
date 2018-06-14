import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';
import MenuItem from './MenuItem';

class List extends React.Component {
  render() {
    const { data } = this.props;
    return (
      <ScrollView>
        { data.map((item, index) => {
          return (
            <MenuItem key={item.id} item={item} addCart={this.props.addCart} deliveryDate={this.props.deliveryDate} />
          )
        }) }
      </ScrollView>
    )
  }
}


export default List;