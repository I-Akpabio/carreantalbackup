import React from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import Icon from "react-native-vector-icons/Ionicons";

import HeaderButtons from "react-navigation-header-buttons";
import { HeaderButton } from "react-navigation-header-buttons";
import { NavigationScreenProps } from "react-navigation/index";
import { Params } from "../../interfaces";

import { Api } from "../../utils/Api";

import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";

import { Card, Button, Icon as NIcon } from "react-native-elements";

const MaterialHeaderButton = (props: any) => (
  <HeaderButton
    {...props}
    IconComponent={MaterialIcons}
    iconSize={23}
    color="white"
  />
);

export class Job extends React.Component<any, any> {
  api: Api; // Api object for connecting

  static navigationOptions = ({
    navigation
  }: NavigationScreenProps<Params>) => ({
    title: "Job Info",
    headerLeft: (
      <HeaderButtons left HeaderButtonComponent={MaterialHeaderButton}>
        <HeaderButtons.Item
          title="hello"
          iconName="menu"
          //onPress={() => navigation.navigate('Details')}
        />
      </HeaderButtons>
    )
  });

  constructor(props: any) {
    super(props);

    this.api = new Api();

    this.state = {
      data: null,
      markers: []
    };
  }

  componentDidMount() {
    this.api.post("getprofile").then(res => {
      this.api
        .post("gethandymanaround", `lat=${res.lat}&lng=${res.lng}&job=1&subjob=1`)
        .then(result => {
          alert(JSON.stringify(result));
          this.setState({data: res, markers: result});
        });
    });
  }

  markerPress = () => {
    alert("I have been pressed");
  };

  render() {
    let view;
    if (this.state.data === null) {
      view = <Text>Loading....</Text>;
    } else {
      view = (
        //       <MapView
        //      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        //      style={styles.map}
        //      region={{
        //        latitude: 6.672884,
        //        longitude: 3.161234,
        //        latitudeDelta: 0.015,
        //        longitudeDelta: 0.0121,
        //      }}
        //    >
        //    {this.state.markers.map((marker: any, id: number) => (
        //   <Marker
        //     key={id}
        //     coordinate={marker.latlng}
        //     title={marker.title}
        //     description={marker.description}
        //     pinColor='#00FF00'
        //     onPress={this.markerPress}
        //   />
        // ))}
        //    </MapView>
        <Card
          title="HELLO WORLD"
          image={{uri:'https://s3.amazonaws.com/infinum.web.production/repository_items/files/000/000/431/original/2.png?1413362252'}}
        >
          <Text style={{ marginBottom: 10 }}>
            The idea with React Native Elements is more about component
            structure than actual design.
          </Text>
          <Button
            icon={<NIcon name="code" color="#ffffff" />}
            backgroundColor="#03A9F4"
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0
            }}
            title="VIEW NOW"
          />
        </Card>
      );
    }
    return <View style={styles.container}>{view}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: Dimensions.get("window").width,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
