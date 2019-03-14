import React from 'react'

import { createBottomTabNavigator, createAppContainer } from 'react-navigation'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import HeaderButtons from "react-navigation-header-buttons"
import { HeaderButton } from 'react-navigation-header-buttons'
import { NavigationScreenProps } from "react-navigation/index"
import { Params }  from "../../interfaces"

import { ServicesNavigator } from './ServicesScreen'
import PostJobScreen from './PostJobScreen';

import { IThoseProps } from "../../interfaces"

const MaterialHeaderButton = (props: any) => (
  <HeaderButton {...props} IconComponent={MaterialIcons} iconSize={23} color="white" />
);

const TabNavigator = createBottomTabNavigator(
  {
    Services: ServicesNavigator,
    PostJob: PostJobScreen,
  },

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: (args: any) => {
        const { routeName } = navigation.state;
        let iconName: string;
        if (routeName === 'Services') {
          iconName = `ios-add-circle-outline`;
        } else if (routeName === 'PostJob') {
          iconName = `ios-airplane`;
        } else {
          iconName=`ios-airplane`;
        }
        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={args.horizontal ? 20 : 25} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#3700B3',
      inactiveTintColor: 'gray',
    },
  }
);

class Home extends React.Component<any, any> {
  static navigationOptions = ({navigation}: NavigationScreenProps<Params>) => ({
    title: "Home",
    headerLeft: (
      <HeaderButtons left HeaderButtonComponent={MaterialHeaderButton}>
        <HeaderButtons.Item
          title="hello"
          iconName="menu"
          onPress={() => navigation.toggleDrawer()}
        />
      </HeaderButtons>
    ),
  });

  render() {
  	let AppContainer  = createAppContainer(TabNavigator);
    return <AppContainer  />;
  }
}


export default Home;