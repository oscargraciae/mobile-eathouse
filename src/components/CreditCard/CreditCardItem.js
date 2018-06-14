import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

import Colors from '../../config/Colors';

function CreditCardItem (props) {
  console.log("ITEMPRS-->", props);
  return (
    <TouchableOpacity style={styles.item} onPress={() => props.selected(props)}>
      <View style={styles.content}>
        <Text style={styles.title}>{props.brand} **** **** **** {props.last4}</Text>
        {/* <Text style={styles.description}>prueba</Text> */}
      </View>
      <View style={styles.iconCheck}>
        { props.id === props.creditCardId ?
          <Ionicon name="ios-checkmark-circle" size={25} color={Colors.secondary} /> :
          <Ionicon name="ios-checkmark-circle" size={25} color="#DDD" />
        }
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexWrap: 'nowrap'
  },
  title: {
    color: Colors.primaryText,
    fontWeight: 'bold',
  },
  description: {
    color: Colors.secondaryText,
  },
  content: {
    flex: 1,
  },
  iconCheck: {
    width: 50,
    padding: 8,
  }
})
export default CreditCardItem;