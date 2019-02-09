import React from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import { ServiceList } from "./pages/ServiceList";
import { ServiceSubList } from "./pages/ServiceSubList";

export const ServicesNavigator = createStackNavigator(
{
    ServiceList: ServiceList,
    ServiceSubList: ServiceSubList
}, 
{
    initialRouteName: "ServiceList",
    headerMode: 'none',
    navigationOptions: {
        header: null
    }
});