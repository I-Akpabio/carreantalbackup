import React from 'react'
import { Component } from 'react';
import { Card, Icon } from 'react-native-elements'
import { Image, ImageBackground, Linking, ScrollView, StyleSheet, Text, View, Alert } from 'react-native'

import { FlatList } from 'react-native'

import mainColor from './constants'

import Email from './Email'
import Separator from './Separator'
import Tel from './Tel'

import { IProfileProps } from "../../interfaces";

import { Api } from "../../utils/Api";

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  emailContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    alignItems: "center"
  },
  placeIcon: {
    color: 'white',
    fontSize: 26,
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  telContainer: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: 30,
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: mainColor,
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
})

class Contact extends Component<IProfileProps, any> {

  api: Api = new Api();

  constructor( props: IProfileProps ) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    this.api.post("getprofile")
    .then((res) => {
      this.setState({
        data: {
          name: res.name,
          city: res.city,
          country: res.country,
          tels: [
            { "id": 1, "name": "Mobile", "number": res.mobile }, 
            { "id": 2, "name": "E-mail", "number": res.email }
           ],
          emails: [
            { "id": 1, "name": "Address", "email": res.address },
            { "id": 2, "name": "City", "email": res.city },
            { "id": 3, "name": "Pincode", "email": res.postal },
            { "id": 4, "name": "Country", "email": res.country }
          ]
        }
      });
    });
  }

  renderTelItem(row: any) {
    const item = row.item;
    const index = row.index;
    return (
      <Tel
        index={index}
        name={item.name}
        number={item.number}
        onPressSms={this.onPressSms}
        onPressTel={this.onPressTel}
      />
    )
  }

  renderEmailItem(row: any) {
    const item = row.item;
    const k = row.index;
    return (
      <Email
        index={k}
        name={item.name}
        email={item.email}
        onPressEmail={this.onPressEmail}
      />
    )
  }

  onPressPlace = () => {
    console.log('place')
  }

  onPressTel = (number: any) => {
    Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
  }

  onPressSms = () => {
    console.log('sms')
  }

  onPressEmail = (email: any) => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
  }

  renderHeader = () => {
    const {
      avatar,
      avatarBackground,
      name,
      //address: { city, country },
    } = this.props

    const { city, country } = this.state.data;

    return (
      <View style={styles.headerContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={{
            uri: avatarBackground,
          }}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                uri: avatar,
              }}
            />
            <Text style={styles.userNameText}>{this.state.data.name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  underlayColor="transparent"
                  iconStyle={styles.placeIcon}
                  onPress={this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  { city }, { country }
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }

  renderTel = (tels: any) => (
    <FlatList 
      data={tels}
      renderItem={this.renderTelItem}
      contentContainerStyle={styles.emailContainer}
      keyExtractor={(item, index) => index.toString()}
    />
  )

  renderEmail = (emails: any) => (
   <FlatList 
      data={emails}
      renderItem={this.renderEmailItem}
      contentContainerStyle={styles.emailContainer}
      keyExtractor={(item, index) => index.toString()}
    />
  )

  render() {
    if(this.state.data === null) {
      return (
        <View>
          <Text>Loading</Text>  
        </View>
        
      );
    } else {
       return (
      <ScrollView style={styles.scroll}>
        <View style={styles.container}>
          <Card containerStyle={styles.cardContainer}>
            {this.renderHeader()}
            {this.renderTel(this.state.data.tels)}
            {Separator()}
            {this.renderEmail(this.state.data.emails)}
          </Card>
        </View>
      </ScrollView>
    )
    }
  }
}

export default Contact