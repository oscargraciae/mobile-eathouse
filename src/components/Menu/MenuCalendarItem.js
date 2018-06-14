import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import moment from 'moment';
import 'moment/min/moment-with-locales'
import 'moment/locale/es'

function MenuCalendarItem(props) {
  let date = moment(props.date, "MM-DD-YYYY", "es").locale("es");
  let selectedDay =  moment(props.selectedDate, "MM-DD-YYYY", "es").locale("mx").format('DD');

  const day = date.day();
  let completeDate = date.format('DD/MM/YYYY');
  let weekDayName = date.format('ddd');
  let weekDayNumber = date.format('DD');
  let dayTime = date.format('HH:mm');

  let currentDate = moment(new Date(Date.now()), "MM-DD-YYYY", "es").locale("mx");
  
  let invalidCurrentDate = false;
  if(currentDate.format('DD') === weekDayNumber) {
    if(dayTime > "10:00") {
      invalidCurrentDate = true;
    }
  }

  return (
    <TouchableOpacity
      style={[styles.itemContainer, selectedDay === weekDayNumber ? styles.selected : null]}
      onPress={((day === 6 || day === 0) || invalidCurrentDate) ? null : () => props.changeDate(props.date)}
    >
      <Text style={[styles.itemText, ((day === 6 || day === 0) || invalidCurrentDate) ? styles.disable : null]}>{weekDayName.toUpperCase()}</Text>
      <Text style={[styles.itemNumber, ((day === 6 || day === 0) || invalidCurrentDate) ? styles.disable : null]}>{weekDayNumber}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    padding: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    color: '#79776B',
    fontWeight: 'bold',
  },
  itemNumber: {
    color: '#79776B',
  },
  selected: {
    borderBottomWidth: 3,
    borderBottomColor: '#3BCF75',
  },
  disable: {
    color: '#dadae1',
  },
});

export default MenuCalendarItem;