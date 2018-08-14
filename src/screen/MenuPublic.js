// import liraries
import React, { Component } from 'react';
import { 
  View, 
  StyleSheet,
} from 'react-native';

// import local libraries
import api from '../config/api';
import Colors from '../config/Colors';
import { formatDateString, getDateSumDays, getMomentDate } from '../utils/formatDate';

// import components
import List from '../components/Menu/List';
import Calendar from '../components/Menu/Calendar';

// create a component
class MenuPublic extends Component {

  state = {
    dishes: null,
    user: null,
    total: 0,
    deliveryDate: null,
    isLoading: true,
    showModaladdress: false,
  }

  componentDidMount() {
    this.initialFetch();
    const currentTime = formatDateString(new Date(Date.now()), 'HH:mm');

    if(currentTime > "11:00") {
      let newDate = getDateSumDays(new Date(Date.now()), 'YYYY/MM/DD', 1);
      let date = getMomentDate(newDate);
      if(date.day() === 6) {
        newDate = getDateSumDays(new Date(Date.now()), 'YYYY/MM/DD', 3);
      } else if(date.day() === 0) {
        newDate = getDateSumDays(new Date(Date.now()), 'YYYY/MM/DD', 2);
      }

      this.setState({ deliveryDate: newDate, isTime: false });
    } else {
      const newDate = formatDateString(new Date(Date.now()), 'YYYY/MM/DD');
      this.setState({ deliveryDate: newDate, isTime: true });
    }

    this.setState({ isLoading: false });
  }

  async initialFetch() {
    const [ dishes ] = await Promise.all([
      api.dish.getAll(),
    ]);

    this.setState({ dishes });
    
  }

  addCart = () => {
    this.props.navigation.navigate("Home");
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.deliveryDate && <Calendar deliveryDate={this.state.deliveryDate} changeDay={this.changeDay} /> }
        { this.state.dishes && <List data={this.state.dishes} addCart={this.addCart} deliveryDate={this.state.deliveryDate} /> }
      </View>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 20,
  },
  btnCart: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnCartText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 12,
  }
});

export default MenuPublic;
