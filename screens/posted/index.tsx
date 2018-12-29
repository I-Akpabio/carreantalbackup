import React from 'react';
import { View, Text } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HeaderButtons from "react-navigation-header-buttons"
import { HeaderButton } from 'react-navigation-header-buttons';
import { NavigationScreenProps } from "react-navigation/index";
import { Params } from "../../interfaces";

const MaterialHeaderButton = (props: any) => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="white" />
);

class Posted extends React.Component {

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
  }

  render() {
    return (
      <View>
        <Text>Stacks Over Tabs</Text>
      </View>
    );
  }
}

export default Posted;