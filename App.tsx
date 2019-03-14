import React from 'react'
import { createDrawerNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { Home } from './screens/home'
import Posted from './screens/posted'
import Profile from './screens/profile'
import { Job } from './screens/job'

// Types
import { NavigationStackScreenOptions } from "react-navigation/index"

class Hidden extends React.Component {
  render() {
    return null;
  }
}

const defaultNavigationOptions: NavigationStackScreenOptions = {
  headerStyle: {
    backgroundColor: '#6200EE',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  }
}

const RootStack1 = createStackNavigator(
  {
    Home: Home
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions
  }
);

const RootStack2 = createStackNavigator(
  {
    Home: Posted,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions
  }
);

const RootStack3 = createStackNavigator(
  {
    Home: Profile,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions
  }
);

const RootStack4 = createStackNavigator(
  {
    Home: Job,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions
  }
);

const TabsInDrawer = createDrawerNavigator({
  HomeScreen: {
    screen: RootStack1,
    navigationOptions: {
      drawerLabel: 'Home',
      drawerIcon: (args: any) => (
        <MaterialIcons name="home" size={24} style={{ color: args.tintColor }} />
      ),
    },
  },

  PostedScreen: {
    screen: RootStack2,
    navigationOptions: {
      drawerLabel: 'Posted Jobs',
      drawerIcon: (args: any) => (
        <MaterialIcons name="email" size={24} style={{ color: args.tintColor }} />
      ),
    },
  },

  ProfileScreen: {
    screen: RootStack3,
    navigationOptions: {
      drawerLabel: 'Profile',
      drawerIcon: (args: any) => (
        <MaterialIcons name="person" size={24} style={{ color: args.tintColor }} />
      ),
    },
  },

  JobScreen: {
    screen: RootStack4,
    navigationOptions: {
      drawerLabel: <Hidden />
    },
  }
},

{
  "initialRouteName": "HomeScreen"
});

export default createAppContainer(TabsInDrawer);