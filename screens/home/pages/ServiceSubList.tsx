import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { ListItem } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";

import { Api } from '../../../utils/Api';

export class ServiceSubList extends React.Component<any, any> {

  api: Api = new Api();

  constructor(props: any) {
    super(props);

    this.state = {
      subServices: []
    };

    const didBlurSubscription = this.props.navigation.addListener(
      'didFocus', (payload: any) => {
        if(this.props.navigation.getParam('servicekey', null) === null) {
          this.props.navigation.navigate("ServiceList");
        } else {
          this.props.navigation.setParams({ servicekey: null });
        } 
      }
    );
  }

  componentDidMount() {
    const { navigation } = this.props;
    const jobId = navigation.getParam('jobid');

    this.api.post("getsubservices", `jobid=${jobId}`)
    .then((res: any) => {
      this.setState({subServices: res});
    });
  }

  _keyExtractor = (item: any, index: any) => index.toString();

  renderListItem = (args: any) => {
    const navigate = this.props.navigation.navigate;
    const jobId = this.props.navigation.getParam('jobid');

    const item = args.item;
    const param = {jobid: jobId, subjobid: item.id}
    return (
      <TouchableOpacity onPress={() => navigate("PostJob", param)}>
        <View style={styles.listItem}>
          <ListItem
            title={item.name}
            rightIcon={<Icon name="ios-arrow-forward" size={25} />}
          />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.subServices}
          keyExtractor={this._keyExtractor}
          renderItem={this.renderListItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30
  },

  listItem: {
    borderBottomWidth: 2,
    borderColor: "silver",
    paddingBottom: 10,
    paddingTop: 5
  }
});