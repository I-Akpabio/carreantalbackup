import React from 'react';

import { View, StyleSheet, Picker, TextInput, DatePickerAndroid, 
  Button, TouchableOpacity, TimePickerAndroid} from 'react-native';

import { IPostJobState } from "../../interfaces/index";

class PostJobScreen extends React.Component<any, IPostJobState> {

 constructor(props: any) {
  super(props);

  this.state = { language: '', title: '', jobDesc: '', date: '', time: '' };
 }

  async datePicker() {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(2020, 4, 25) // Enter the start date
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({date: `${year}-${month}-${day}`});
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }
  }


  async timepicker() {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: 14,
        minute: 0,
        is24Hour: false, // Will display '2 PM'
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        this.setState({time: `${hour}:${minute}`});
      }
    } catch ({ code, message }) {
      console.warn('Cannot open time picker', message);
    }
  }

  submit() {

  }

  render() {
    return (
      <View style={styles.root}>

        <Picker
          selectedValue={this.state.language}
          style={styles.categoryPicker}
          onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
          <Picker.Item label="Select Category" value="" />
          <Picker.Item label="Legal" value="legal" />
          <Picker.Item label="Household Services" value="house" />
          <Picker.Item label="Business Services" value="bus" />
          <Picker.Item label="Repair and Maintainance" value="rep" />
          <Picker.Item label="Personal and More" value="personal" />
        </Picker>

        <TextInput
          placeholder="Title Of Job"
          style={styles.title}
          onChangeText={(title) => this.setState({title})}
          value={this.state.title}
      />

      <TouchableOpacity onPress={() => this.datePicker()}>
        <TextInput
            placeholder="Select Date"
            placeholderTextColor="grey"
            editable={false}
            style={styles.title}
            value={this.state.date}
        />
      </TouchableOpacity>

       <TouchableOpacity onPress={() => this.timepicker()}>
        <TextInput
            placeholder="Select Time"
            placeholderTextColor="grey"
            editable={false}
            style={styles.title}
            value={this.state.time}
        />
      </TouchableOpacity>

       <TextInput
          placeholder="Describe you job requirement"
          multiline={true}
          style={styles.jobDesc}
          onChangeText={(jobDesc) => this.setState({jobDesc})}
          value={this.state.jobDesc}
      />

      <Button onPress={() => this.submit()} title="Submit"></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    marginTop: 5,
    paddingLeft: 15,
    paddingRight: 15
  },
  categoryPicker: { 
    height: 70, 
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 17,
    padding: 7,
    height: 40, 
    borderColor: 'gray', 
    borderWidth: 1,
    width: '100%',
    marginBottom: 10
  },
  jobDesc: {
    fontSize: 17,
    padding: 7,
    textAlignVertical: "top",
    height: 150, 
    borderColor: 'gray', 
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
  }
});

export default PostJobScreen;