import React from 'react';

import { View, StyleSheet, Picker, TextInput, DatePickerAndroid, Button,
        TouchableOpacity,TimePickerAndroid,StatusBar, Alert 
} from 'react-native';

import { IPostJobState } from "../../interfaces/index";

import { Api } from '../../utils/Api';

class PostJobScreen extends React.Component <any, IPostJobState> {

    api: Api = new Api();

    constructor(props: any) {
        super(props);

        this.state = { 
            item: '', 
            subItem: '', 
            title: '', 
            jobDesc: '', 
            date: '', 
            time: '', 
            items: [], 
            subItems: null 
        };

        const didBlurSubscription = this.props.navigation.addListener(
          'didFocus', (payload: any) => {
            this.startUp()
          }
        );
    }

    startUp() {
        const { navigation } = this.props;
        const jobID = navigation.getParam('jobid', null);
        const subJobID = navigation.getParam('subjobid', null);

        // If the jobID is passed initiate get services and make sure the item is set to the sent id
        if(jobID !== null) {

            this.api.post("getservices")
            .then((res: any) => {
                this.api.post("getsubservices", `jobid=${jobID}`)
                .then((res2: any) => {
                    this.setState({ 
                        items: res, 
                        item: jobID, 
                        subItem: subJobID, 
                        subItems: res2 
                    });
                });
            });

        } else 
        // If the jobID is not passed so start from the beginning with fetching the list
        {
            this.api.post("getservices")
            .then((res: any) => {
                this.setState({ items: res });
            });
        }
    }

    async datePicker() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(2020, 4, 25) // Enter the start date
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                // Selected year, month (0-11), day
                this.setState({ date: `${year}-${month}-${day}` });
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
            let min: string = String(minute);
            if(min.length < 2 ) min += "0";
            if (action !== TimePickerAndroid.dismissedAction) {
                this.setState({ time: `${hour}:${min}` });
            }
        } catch ({ code, message }) {
            console.warn('Cannot open time picker', message);
        }
    }

    onItemValueChanged = (itemValue: any) => {
        if(!itemValue || this.state.item == itemValue) return; 
        this.setState({item: itemValue});
        this.api.post("getsubservices", `jobid=${itemValue}`)
        .then((res: any) => {
            this.setState({subItems: res});
        });
    }

    renderItemPicker = () => {
        const Items = this.state.items.map(
            (item: any, i: any) => <Picker.Item key={i} label={item.name} value={item.id} />
        );

        return (
            <Picker
              selectedValue={this.state.item}
              style={styles.categoryPicker}
              onValueChange={this.onItemValueChanged}>
               <Picker.Item label="Select Category" value="" />
               { Items }
            </Picker>
        );
    }

    renderSubItemPicker = () => {
        if(this.state.subItems == null) {
            return null;
        }
        const Items = this.state.subItems.map(
            (item: any, i: any) => <Picker.Item key={i} label={item.name} value={item.id} />
        );

        return (
            <Picker
              selectedValue={this.state.subItem}
              style={styles.categoryPicker}
              onValueChange={(itemValue) => this.setState({subItem: itemValue})}>
              <Picker.Item label="Select Category" value="" />
              { Items }
            </Picker>
        );
    }

    submit = () => {
        const s = this.state;
        const data = `item=${s.item}&subitem=${s.subItem}&title=${s.title}&date=${s.date}&time=${s.time}&desc=${s.jobDesc}`;
        
        this.api.post("postjob", data)
        .then(res => {
            this.setState({ 
                item: '', 
                subItem: '', 
                title: '', 
                jobDesc: '', 
                date: '', 
                time: '',
                subItems: null 
            });

            Alert.alert("Success", "Your Job has been posted succesfully");
        });
    }

    render() {
        return (
        <View style={styles.root}>
        <StatusBar backgroundColor="#3700B3" barStyle="light-content"></StatusBar>

        { this.renderItemPicker() }

        { this.renderSubItemPicker() }

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
          onChangeText={(jobDesc) => this.setState({ jobDesc })}
          value={this.state.jobDesc}
      />

      <Button onPress={this.submit} title="Submit"></Button>
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