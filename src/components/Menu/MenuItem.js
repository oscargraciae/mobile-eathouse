import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';

// import local libraries
import Colors from '../../config/Colors';
import { moneyThousand } from '../../utils/formatNumber';

class MenuItem extends React.Component {


  _addItem = () => {
    const productToCart = this.props.cart.data.filter((item) => item.id === this.props.item.id && item.deliveryDate === this.props.deliveryDate)[0];
    this.props.addCart(this.props.item, productToCart.quantity + 1);
  }

  _removeItem = () => {
    const productToCart = this.props.cart.data.filter((item) => item.id === this.props.item.id && item.deliveryDate === this.props.deliveryDate)[0];
    this.props.addCart(this.props.item, productToCart.quantity - 1);
  }

  btnAdd = () => {
    return (
      <TouchableOpacity style={styles.button} onPress={() => this.props.addCart(this.props.item, 1)}>
        <Text style={styles.buttonText}>AGREGAR</Text>
      </TouchableOpacity>
    )
  }

  btnCart = (productToCart) => {
    return (
      <View style={styles.btns}>
        <TouchableOpacity style={styles.button} onPress={this._removeItem}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantityText}>{productToCart.quantity}</Text>
        <TouchableOpacity style={styles.button} onPress={this._addItem}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { id, name, image, price } = this.props.item;
    const productToCart = this.props.cart.data.filter((item) => item.id === id && item.deliveryDate === this.props.deliveryDate)[0];
    return (
      <View style={styles.item}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.price}>${moneyThousand(price)}</Text>
          <View style={styles.buttons}>
            { productToCart ? this.btnCart(productToCart) : this.btnAdd() }
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    // paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e8ebe9',
    paddingBottom: 7,
    marginBottom: 7,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 10,
  },
  content: {
    paddingHorizontal: 10,
    flex: 1,
  },
  name: {
    color: Colors.primaryText,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 10,
    // height: 50,
  },
  price: {
    fontSize: 14,
    color: Colors.secondaryText,
    fontWeight: '500',
    color: Colors.secondary,
  },
  buttons: {
    flex: 1,
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 12,
  },
  btns: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: 'bold',
  }
})

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  }
};

export default connect(mapStateToProps)(MenuItem);