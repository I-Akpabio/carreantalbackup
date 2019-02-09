import * as React from 'react'
import { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Alert } from "react-native"

import Icon from "react-native-vector-icons/Ionicons"
import GridView from 'react-native-super-grid'

import { Api } from '../../../utils/Api';

export class ServiceList extends Component<any, any> {

    api: Api = new Api();

    constructor(props: any) {
        super(props);

        this.state = {
        	items: []
        };
    }

    componentDidMount() {
    	this.api.post("getservices")
        .then((res: any) => {
          this.setState({items: res});
        });
    }

    render() {
    	const { navigate } = this.props.navigation;

    	const { items } = this.state;

        return (
            <GridView
		        spacing={25}
		        itemDimension={150}
		        items={items}
		        style={styles.gridView}
		        renderItem={item => (
		          <TouchableOpacity 
		          	onPress={() => navigate('ServiceSubList', {jobid: item.id, servicekey: 'key'})}
		          >
		            <View style={[styles.itemContainer, { backgroundColor: 'white' }]}>
		              <Text style={styles.centerText}>
		                <Icon name="ios-home" color="black" size={50} />
		              </Text>
		              <Text style={[styles.itemName, styles.centerText]}>{item.name}</Text>
		            </View>

		          </TouchableOpacity>
		        )}
		    />
        );
    }
}

const styles = StyleSheet.create({
  gridView: {
    backgroundColor: '#f2f2f2',
    paddingTop: 25,
    flex: 1
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 5,
    padding: 10,
    height: 120,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600'
  },
  centerText: {
    textAlignVertical: "center",
    textAlign: "center"
  }
});