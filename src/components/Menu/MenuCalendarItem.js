import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import { getDaysByMoment, getMomentDateByFormat, getMomentDate, getMomentDay } from '../../utils/formatDate';

function MenuCalendarItem(props) {
  
  let { day, weekDayName, weekDayNumber, dayTime, } = getDaysByMoment(props.date, "MM-DD-YYYY");
  let selectedDay = getMomentDateByFormat(props.selectedDate, "DD");

  let currentDate = getMomentDay(Date.now());
  
  let invalidCurrentDate = false;
  if(currentDate === weekDayNumber) {
    if(dayTime > "11:00") {
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