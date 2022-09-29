import React, {useState, useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from './components/context';
import {
  Provider as PaperProvider
} from 'react-native-paper';
//import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth'
import firebase from '@react-native-firebase/app';
import PushNotification from "react-native-push-notification";


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import Dashboard from './screens/Dashboard';
import RootstackScreen from './screens/RootstackScreen';


const Stack = createNativeStackNavigator();
//const Stack = createStackNavigator();
// function MyStack() {
//   return (
//     <Stack.Navigator
//       initialRouteName="Splash"
//       screenOptions={{
//         headerTitleAlign: 'center',
//         headerStyle: {
//           backgroundColor: '#3740FE',
//         },
//         headerTintColor: '#fff',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//       }}>
//       <Stack.Screen
//         name="Splash"
//         component={SplashScreen}
//         //options={{ title: 'Signup' }}
//       />
//       <Stack.Screen
//         name="Login"
//         component={LoginScreen}

//       />
//       <Stack.Screen
//        name="Dash"
//        component={Dashboard}


//       />
//     </Stack.Navigator>
//   );
// }
 export default function App({navigation}){
   PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    //notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  // permissions: {
  //   alert: true,
  //   badge: true,
  //   sound: true,
  // },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});
//   ComponentDidMount();
//     firebase.initializeApp(this);
//     PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log("TOKEN:", token);
//   },

//   // (required) Called when a remote is received or opened, or local notification is opened
//   onNotification: function (notification) {
//     console.log("NOTIFICATION:", notification);

//     // process the notification

//     // (required) Called when a remote is received or opened, or local notification is opened
//     notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },

//   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
//   onAction: function (notification) {
//     console.log("ACTION:", notification.action);
//     console.log("NOTIFICATION:", notification);

//     // process the action
//   },

//   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//   onRegistrationError: function(err) {
//     console.error(err.message, err);
//   },

//   // IOS ONLY (optional): default: all - Permissions to register.
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true,
//   },

//   // Should the initial notification be popped automatically
//   // default: true
//   popInitialNotification: true,

//   /**
//    * (optional) default: true
//    * - Specified if permissions (ios) and token (android and ios) will requested or not,
//    * - if not, you must call PushNotificationsHandler.requestPermissions() later
//    * - if you are not using remote notification or do not have Firebase installed, use this:
//    *     requestPermissions: Platform.OS === 'ios'
//    */
//   requestPermissions: true,
// });
//*create Channel



  return (
    <NavigationContainer>
      <RootstackScreen/>
    </NavigationContainer>
  );
}
// const App = () => {
//   const [user,setuser] = useState('')
//   useEffect(()=>{
//    const unregister =  auth().onAuthStateChanged(userExist=>{
//       if(userExist){

//         firestore().collection('users')
//         .doc(userExist.uid)
//         .update({
//           status:"online"
//         })
//         setuser(userExist)


//       }

//       else setuser("")
//     })

//     return ()=>{
//       unregister()
//     }

//   },[])
//   const initialLoginState = {
//     isLoading: true,
//     userName: null,
//     userToken: null,
//   };

//   const loginReducer = (prevState, action) => {
//     switch( action.type ) {
//       case 'RETRIEVE_TOKEN':
//         return {
//           ...prevState,
//           userToken: action.token,
//           isLoading: false,
//         };
//       case 'LOGIN':
//         return {
//           ...prevState,
//           userName: action.id,
//           userToken: action.token,
//           isLoading: false,
//         };
//       case 'LOGOUT':
//         return {
//           ...prevState,
//           userName: null,
//           userToken: null,
//           isLoading: false,
//         };
//       case 'REGISTER':
//         return {
//           ...prevState,
//           userName: action.id,
//           userToken: action.token,
//           isLoading: false,
//         };
//     }
//   };
//   const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

//   const authContext = React.useMemo(() => ({
//     signIn: async(foundUser) => {
//       // setUserToken('fgkj');
//       // setIsLoading(false);
//       const userToken = String(foundUser[0].userToken);
//       const userName = foundUser[0].username;

//       try {
//         await AsyncStorage.setItem('userToken', userToken);
//       } catch(e) {
//         console.log(e);
//       }
//       // console.log('user token: ', userToken);
//       dispatch({ type: 'LOGIN', id: userName, token: userToken });
//     },
//     signOut: async() => {
//       // setUserToken(null);
//       // setIsLoading(false);
//       try {
//         await AsyncStorage.removeItem('userToken');
//       } catch(e) {
//         console.log(e);
//       }
//       dispatch({ type: 'LOGOUT' });
//     },
//     signUp: () => {
//       // setUserToken('fgkj');
//       // setIsLoading(false);
//     },

//   }), []);

//   useEffect(() => {
//     setTimeout(async() => {
//       // setIsLoading(false);
//       let userToken;
//       userToken = null;
//       try {
//         userToken = await AsyncStorage.getItem('userToken');
//       } catch(e) {
//         console.log(e);
//       }
//       // console.log('user token: ', userToken);
//       dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
//     }, 1000);
//   }, []);

//   if( loginState.isLoading ) {
//     return(
//       <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//         <ActivityIndicator size="large"/>
//       </View>
//     );
//   }
//   return (


//     <NavigationContainer>
//       <Stack.Navigator
//        screenOptions={{
//          headerTintColor:"green"
//        }}

//       >
//         {user?
//         <>
//         <Stack.Screen name="Profile"  options={{
//           // headerRight:()=><MaterialIcons
//           // name="account-circle"
//           // size={34}
//           // color="green"
//           // style={{marginRight:10}}
//           // onPress={()=>{
//           //   firestore().collection('users')
//           //   .doc(user.uid)
//           //   .update({
//           //     status:firestore.FieldValue.serverTimestamp()
//           //   }).then(()=>{
//           //        auth().signOut()
//           //   })


//           // }}
//           // />,
//         }}>
//          {props => <HomeScreen {...props}  user={user} />}

//          </Stack.Screen>
//          </>
//         :
//         <>
//        <Stack.Screen name="Root" component={RootstackScreen} options={{headerShown:false}}/>
//       </>
//     }
//     </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// //export default App;
//   //return (
//     //<NavigationContainer>
//       //<Stack.Navigator>
//       //<Stack.Screen name="Splash" component={SplashScreen}/>
//         //<Stack.Screen name="Login" component={LoginScreen}/>
//         //<Stack.Screen name="Register" component={RegisterScreen}/>
//         //<Stack.Screen name="Home" component={HomeScreen}/>
//       //</Stack.Navigator>
//     //</NavigationContainer>
//   //);
// //};


// export default App;
