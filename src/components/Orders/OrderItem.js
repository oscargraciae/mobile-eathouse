import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

// import local libraries
import Colors from '../../config/Colors';
import { formatDate } from '../../utils/formatDate';
import { moneyThousand } from '../../utils/formatNumber';

function OrderItem(props) {
  const { id, created_at, total } = props;
  return (
    <TouchableOpacity style={styles.item} onPress={() => props.onPress(props)}>
      <View style={styles.element}>
        <Text style={styles.value}>#{id}</Text>
        <Text style={styles.label}># Orden</Text>
      </View>
      <View style={styles.element}>
        <Text style={styles.value}>{formatDate(created_at)}</Text>
        <Text style={styles.label}>Fecha de compra</Text>
      </View>
      <View style={styles.element}>
        <Text style={styles.value}>${moneyThousand(total)}</Text>
        <Text style={styles.label}>Total</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  element: {
    
  },
  value: {
    color: Colors.primaryText,
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    color: Colors.secondaryText,
    fontSize: 12,
  }
});

export default OrderItem;