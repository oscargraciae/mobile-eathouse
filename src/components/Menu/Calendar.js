import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import MenuCalendarItem from './MenuCalendarItem';

class Calendar extends React.Component {

  state = {
    weekDays: [],
    // selectedDate: new Date(Date.now()),
    selectedDate: new Date(this.props.deliveryDate)
  }

  componentWillMount() {
    let curr = new Date;
    let dates = [];
    let day = 0;
    while (day <= 12) {
      let nextDate = new Date(curr);
      nextDate.setDate(curr.getDate()+day);
      dates.push(nextDate);
      day++;
    }

    this.setState({ weekDays: dates });
  }

  changeDate = (date) => {
    this.setState({ selectedDate: date}, () => {
      this.props.changeDay(this.state.selectedDate);
    });
  }

  render() {
    const { weekDays } = this.state;
    return (
      <View>
        <Text style={styles.title}>DÍA DE ENTREGA</Text>
        <ScrollView style={styles.container} horizontal>
          { weekDays.map((item, index) => {
            return (
              <MenuCalendarItem key={index} date={item} selectedDate={this.state.selectedDate} changeDate={this.changeDate} />
            )
          }) }
        </ScrollView>
      </View>
      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  title: {
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  }
})

export default Calendar;