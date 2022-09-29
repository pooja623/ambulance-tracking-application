import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return(
    <Tab.Navigator  screenOptions={{
        headerShown: false,
        tabBarShownLabel:false,
        tabBarStyle:{backgroundColor: '#52b372'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor:'yellow'

    }}>
      <Tab.Screen name="Home1" component={HomeScreen} />
      <Tab.Screen name="Login1" component={LoginScreen} />
      <Tab.Screen name="Register1" component={RegisterScreen} />
    </Tab.Navigator>
    )
}

export default TabNavigator;
