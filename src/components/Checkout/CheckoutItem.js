import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

// import local libraries
import Colors from '../../config/Colors';
import { formatDateString } from '../../utils/formatDate';
import { moneyThousand } from '../../utils/formatNumber';

function CheckoutItem(props) {
  return (
    <View style={styles.item}>
      <Image source={{ uri: props.image }} style={styles.image}/>
      <View style={styles.content}>
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.total}>({props.quantity}) ${moneyThousand(props.total)} MX</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#DDD',
  },
  content: {
    paddingLeft: 10,
  },
  image: {
    width: 50,
    height: 50,
  },
  name: {
    fontWeight: 'bold',
    color: Colors.primaryText,
  },
  date: {
    color: Colors.secondaryText,
    fontSize: 12,
  },
  total: {
    color: Colors.secondary,
  }
});

export default CheckoutItem;