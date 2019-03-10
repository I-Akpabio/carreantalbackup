import React from 'react';
import { View, Text, Alert, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Icon from "react-native-vector-icons/Ionicons";

import HeaderButtons from "react-navigation-header-buttons"
import { HeaderButton } from 'react-navigation-header-buttons';
import { NavigationScreenProps } from "react-navigation/index";
import { Params } from "../../interfaces";

import { Api } from '../../utils/Api';

const MaterialHeaderButton = (props: any) => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="white" />
);

class Posted extends React.Component<any, any> {

  api: Api; // Api object for connecting

  static navigationOptions = ({navigation}: NavigationScreenProps<Params>) => ({
    title: "Posted Jobs",
    headerLeft: (
      <HeaderButtons left HeaderButtonComponent={MaterialHeaderButton}>
        <HeaderButtons.Item
          title="hello"
          iconName="menu"
          //onPress={() => navigation.navigate('Details')}
        />
      </HeaderButtons>
    ),
  });

  constructor(props: any) {
    super(props);

    this.api = new Api();

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.api.post("getuserpostedjob", "id=1")
    .then(res => {
      this.setState({ data: res });
    });
  }

  navigateToJob = (id: any) => {
    this.props.navigation.navigate("JobScreen", {id: id});
  }

  renderItem(item: any) {
    let Tag
    if(item.handyman_id === "0") {
      Tag = <Text style={styles.tag}>Job Not Assigned</Text>
    } else {
      Tag = <Text style={styles.redTag}>Job Assigned</Text>
    }
    return (
      <TouchableOpacity onPress={() => this.navigateToJob(item.id)}>
        <View style={styles.listContainer}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Icon name="ios-settings" size={50}></Icon>
            <Text style={{color: 'black', fontSize: 19}}>{item.title}</Text>
            { Tag }
          </View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Text style={{width: "50%", fontSize: 16}}>Date: {item.job_date}</Text>
            <Text style={{width: "50%", fontSize: 16}}>Time: {item.job_time}</Text>
          </View>
      </View>
      </TouchableOpacity>
    );
  }

  render() {
    if(this.state.data === null) {
      return  (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={({item}) => this.renderItem(item)}
          keyExtractor={(item, index) => item.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },

  listContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
  },

  tag: {
    position: 'absolute', 
    right: 0, 
    color: 'white', 
    backgroundColor: 'orange',
    padding: 4
  },

  redTag: {
    position: 'absolute', 
    right: 0, 
    color: 'white', 
    backgroundColor: 'green',
    padding: 4
  }

});

export default Posted;