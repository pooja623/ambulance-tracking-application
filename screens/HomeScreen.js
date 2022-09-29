import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import LoginScreen from './RegisterScreen';
import RegisterScreen from './LoginScreen';
import ProfileScreen from './ProfileScreen';
import HospitalScreen from './HospitalScreen';
import {
    SafeAreaView,
    Image,
    Text,
    View,
    StyleSheet,
    Dimensions,
    Animated,
    TouchableOpacity,
  } from 'react-native';
import Hospital from './HospitalScreen';
import Dashboard from './Dashboard';

  const Tab = createBottomTabNavigator();
  //const Tab = createMaterialBottomTabNavigator();
  const HomeScreen = () => {
    return(
    <Tab.Navigator  screenOptions={{
        headerShown: false,
        tabBarShownLabel:false,
        tabBarStyle:{backgroundColor: '#52b372'},
        tabBarInactiveTintColor: '#fff',
        tabBarActiveTintColor:'yellow'

    }}>
      <Tab.Screen name="Home" component={ProfileScreen} options={{tabBarIcon:({color,size})=>(
        <Ionicons name="home-outline" color={color} size={size}/>
      )
      }}/>
      <Tab.Screen name="Hospital" component={HospitalScreen} options={{tabBarIcon:({color,size})=>(
        <Ionicons name="home-outline" color={color} size={size}/>
      )
      }}/>
      <Tab.Screen name="Dash" component={Dashboard} options={{tabBarIcon:({color,size})=>(
        <Feather name="shopping-bag" color={color} size={size}/>
      )
      }}/>
    </Tab.Navigator>
    )
  }
 export default HomeScreen;
