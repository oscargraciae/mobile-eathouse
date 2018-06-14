//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// import local libraries
import api from '../config/api';
import { formatDateString } from '../utils/formatDate';

// import components
import LoadingView from '../components/LoadingView';
import ScheduleDishItem from '../components/Schedule/ScheduleDishItem';

// create a component
class Schedule extends Component {

  state = {
    schedules: [],
    isLoading: true,
  }

  componentDidMount() {
    this.initialFetch();
  }

  async initialFetch() {
    const schedules = await api.orders.getSchedules();
    const groupSchedules = this.groupBy(schedules);
    this.setState({ schedules: groupSchedules, isLoading: false });
  }

  groupBy(data) {
    let groups = {};
    for (let i = 0; i < data.length; i++) {
      const deliveryDate = data[i].deliveryDate;
      if(!groups[deliveryDate]) {
        groups[deliveryDate] = [];
      }
      groups[deliveryDate].push({ data: data[i] });
    }
    let array = [];
    for (let x in groups) {
      array.push({name: x, data: groups[x]});
      // array.unshift({name: x, data: groups[x]});
    }
    return array;
  }
  
  render() {
    console.log("Schedukes---->", this.state.schedules);
    const { isLoading, schedules } = this.state;

    if(isLoading) {
      return (
        <LoadingView />
      )
    }

    return (
      <ScrollView style={styles.container}>
        { schedules.map((item, index) => {
          return (
            <View style={styles.groupSchedule} key={index}>
              <Text style={styles.title}>{formatDateString(item.name, "DD MMMM YYYY")}</Text>
              { item.data.map((e, index) => {
                  return (
                    <ScheduleDishItem {...e.data} key={e.data.id}/>
                  )
                }) }              
            </View>
          )
        }) }
      </ScrollView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  groupSchedule: {
    marginBottom: 20,
  },
  title: {
    paddingHorizontal: 15,
    fontWeight: 'bold',
  }
});

//make this component available to the app
export default Schedule;
