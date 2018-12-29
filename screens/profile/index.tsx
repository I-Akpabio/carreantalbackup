import React from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HeaderButtons from "react-navigation-header-buttons"
import { HeaderButton } from 'react-navigation-header-buttons';
import { NavigationScreenProps } from "react-navigation/index";
import { Params } from "../../interfaces";

import { ProfileScreen } from "./App";

const MaterialHeaderButton = (props: any) => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="white" />
);

class Profile extends React.Component {

  static navigationOptions = ({navigation}: NavigationScreenProps<Params>) => ({
    title: "Profile",
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
  }

  render() {
    return (<ProfileScreen />);
  }
}

export default Profile;