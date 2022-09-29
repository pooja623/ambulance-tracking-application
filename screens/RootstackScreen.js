

import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';

import LoginScreen from './RegisterScreen';

import RegisterScreenuser from './RegisterScreenuser';
import SigninScreen from './SigninScreen';
import RegisterScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import Hospital from './HospitalScreen';
import HospitalScreen from './HospitalScreen';
import ChooseLocation from './chooseLocation';
import Dashboard from './Dashboard';


const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="Splash" component={SplashScreen}/>
        <RootStack.Screen name="Sign" component={SigninScreen}/>
        <RootStack.Screen name="Login" component={LoginScreen}/>
        <RootStack.Screen name="Register" component={RegisterScreen}/>
        <RootStack.Screen name="User" component={RegisterScreenuser}/>

        <RootStack.Screen name="Profile" component={HomeScreen}/>
        <RootStack.Screen name="Hospital" component={HospitalScreen}/>
        <RootStack.Screen name="Home" component={ProfileScreen}/>
        <RootStack.Screen name="ChooseLocation" component={ChooseLocation}/>
         <RootStack.Screen name="Dash" component={Dashboard}/>
    </RootStack.Navigator>
);

export default RootStackScreen;
