import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Button as NormalButton,
  Linking
} from "react-native";

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
          onPress={() => navigation.goBack()}
        />
      </HeaderButtons>
    )
  });

  constructor(props: any) {
    super(props);

    this.api = new Api();

    this.state = {
      data: null,
      markers: [],
      selected: null
    };

    const didBlurSubscription = this.props.navigation.addListener(
      "didFocus",
      (payload: any) => {
        this.initScreen(payload.action.params);
      }
    );
  }

  initScreen = (params: any) => {
    this.api.post("getprofile").then(res => {
      this.api
        .post(
          "gethandymanaround",
          `lat=${res.lat}&lng=${res.lng}&job=${params.item}&subjob=${
            params.subItem
          }`
        )
        .then(result => {
          const markers = result.map((m, i) =>
            Object.assign({}, m, { provider: false })
          );
          this.setState({ data: res, markers: markers });
        });
    });
  };

  markerPress = (e: any, marker: any) => {
    this.setState({ selected: marker });
  };

  selectProvider = (i: any) => {
    
    const markers = this.state.markers.map((m: any) => {
      if (m.id === i) {
        return Object.assign({}, m, { provider: true });
      } else {
        return m;
      }
    })

    let selected = markers.filter( (c) => c.id === this.state.selected.id)[0];

    this.setState({ markers, selected });
  };

  render() {
    if (this.state.data === null) {
      return <Text>Loading....</Text>;
    }

    let selected = this.state.selected;

    return (
      <View>
        <View style={styles.container}>
          {this.state.markers.map((marker: any, id: number) => (
            <NormalButton
              key={id}
              title={marker.companyname}
              onPress={e => this.markerPress(e, marker)}
            />
          ))}

          {/* <MapView
             provider={PROVIDER_GOOGLE} // remove if not using Google Maps
             style={styles.map}
             initialRegion={{
               latitude: 6.672884,
               longitude: 3.161234,
               latitudeDelta: 0.015,
               longitudeDelta: 0.0121,
             }}
           >
          {this.state.markers.map((marker: any, id: number) => (
          <Marker
            key={id}
            coordinate={{latitude: Number(marker.lat),longitude: Number(marker.lng) }}
            title={marker.companyname}
            description={marker.bio}
            pinColor='#00FF00'
            onPress={(e) => this.markerPress(e,marker)}
          />
        ))}
        </MapView> */}
        </View>

        {selected !== null ? (
          <Card title={selected.companyname} image={{ uri: selected.image1 }}>
            <Text style={{ marginBottom: 10 }}>{selected.bio}</Text>
            {selected.provider === true ? (
              <View>
                  <Button onPress={() => Linking.openURL(`tel://08023308469`).catch(err => console.log('Error:', err))} 
                  icon={<NIcon name="code" color="#ffffff" />} backgroundColor="#03A9F4" title="Call" />
                  <Button onPress={() => alert("msg")} icon={<NIcon name="code" color="#ffffff" />} backgroundColor="#03A9F4" title="Message" />
                  <Button onPress={() => alert("email")} icon={<NIcon name="code" color="#ffffff" />} backgroundColor="#03A9F4" title="Email" />
              </View>
            ) : (
              <Button
                icon={<NIcon name="code" color="#ffffff" />}
                backgroundColor="#03A9F4"
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0
                }}
                title="SELECT AS PROVIDER"
                onPress={() => this.selectProvider(selected.id)}
              />
            )}
          </Card>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //...StyleSheet.absoluteFillObject,
    height: 400,
    width: Dimensions.get("window").width,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});
