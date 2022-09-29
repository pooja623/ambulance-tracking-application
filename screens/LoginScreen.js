import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator,TouchableOpacity } from 'react-native';
//import firebase from '../database/firebase';
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging'
import PushNotification from "react-native-push-notification";

export default class LoginScreen extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      isLoading: false
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  userLogin = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signin!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      messaging().getToken().then(token=>{
        firestore().collection('usertoken').add({
          token:token
        })
      })
      .then((res) => {
        console.log(res)
        console.log('User logged-in successfully!')
        this.setState({
          isLoading: false,
          email: '',
          password: ''
        })
        this.props.navigation.navigate('Profile')
      })
      .catch(error => this.setState({ errorMessage: error.message }))
    }
  }
  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E"/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          placeholder="Email"
          value={this.state.email}
          onChangeText={(val) => this.updateInputVal(val, 'email')}
        />
        <TextInput
          style={styles.inputStyle}
          placeholder="Password"
          value={this.state.password}
          onChangeText={(val) => this.updateInputVal(val, 'password')}
          maxLength={15}
          secureTextEntry={true}
        />
        <Button
          color="#52b372"
          title="Signin"
          onPress={() => this.userLogin()}
        />
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Sign')}>
          Don't have account? Click here to signup
        </Text>
         <Button
          color="#52b372"
          title="Emergency"

           onPress={() => this.props.navigation.navigate('Profile')}
        />

      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 35,
    backgroundColor: '#fff'
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  loginText: {
    color: '#52b372',
    marginTop: 25,
    marginBottom: 10,
    textAlign: 'center'
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }
});
// import React,{useState} from 'react'
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     TextInput,
//     Platform,
//     StyleSheet ,
//     StatusBar,
//     ActivityIndicator,
//     Alert
// } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// //import LinearGradient from 'react-native-linear-gradient';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import Feather from 'react-native-vector-icons/Feather';
// import auth from '@react-native-firebase/auth'
// import { useTheme } from 'react-native-paper';

// import { AuthContext } from '../components/context';

// //import Users from '../model/users';

// const LoginScreen = ({navigation}) => {
//     const [email,setEmail] = useState('')
//     const [password,setPassword] = useState('')
//     const [contact_number,setNumber] = useState('')
//     const [loading,setLoading] = useState(false)
//     if(loading){
//         return  <ActivityIndicator size="large" color="#00ff00" />
//     }
//     const userLogin = async ()=>{
//         setLoading(true)
//         if(!email || !password){
//                alert("please add all the field")
//                return
//         }
//         try{
//           const result =  await auth().signInWithEmailAndPassword(email,password)
//             setLoading(false)
//         }catch(err){
//             alert("something went wrong")
//         }


//     }

//     // const [data, setData] = React.useState({
//     //     email: '',
//     //     password: '',
//     //     check_textInputChange: false,
//     //     secureTextEntry: true,
//     //     isValidUser: true,
//     //     isValidPassword: true,
//     // });
//     const { colors } = useTheme();
//     // //const { signIn } = React.useContext(AuthContext);

//     // const textInputChange = (val) => {
//     //     if( val.trim().length >= 4 ) {
//     //         setData({
//     //             ...data,
//     //             email: val,
//     //             check_textInputChange: true,
//     //             isValidUser: true
//     //         });
//     //     } else {
//     //         setData({
//     //             ...data,
//     //             email: val,
//     //             check_textInputChange: false,
//     //             isValidUser: false
//     //         });
//     //     }
//     // }

//     // const handlePasswordChange = (val) => {
//     //     if( val.trim().length >= 8 ) {
//     //         setPassword({
//     //             ...data,
//     //             password: val,
//     //             isValidPassword: true
//     //         });
//     //     } else {
//     //         setPassword({
//     //             ...data,
//     //             password: val,
//     //             isValidPassword: false
//     //         });
//     //     }
//     // }

//     // const updateSecureTextEntry = () => {
//     //     setData({
//     //         ...data,
//     //         secureTextEntry: !data.secureTextEntry
//     //     });
//     // }

//     // const handleValidUser = (val) => {
//     //     if( val.trim().length >= 10 ) {
//     //         setData({
//     //             ...data,
//     //             isValidUser: true
//     //         });
//     //     } else {
//     //         setData({
//     //             ...data,
//     //             isValidUser: false
//     //         });
//     //     }
//     // }

//     // const loginHandle = (email, password) => {

//     //     const foundUser = Users.filter( item => {
//     //         return email == item.email && password == item.password;
//     //     } );

//     //     if ( data.email.length == 0 || data.password.length == 0 ) {
//     //         Alert.alert('Wrong Input!', 'Username or password field cannot be empty.', [
//     //             {text: 'Okay'}
//     //         ]);
//     //         return;
//     //     }

//     //     if ( foundUser.length == 0 ) {
//     //         Alert.alert('Invalid User!', 'Username or password is incorrect.', [
//     //             {text: 'Okay'}
//     //         ]);
//     //         return;
//     //     }
//     //     signIn(foundUser);
//     // }

//     return (
//       <View style={styles.container}>
//           <StatusBar backgroundColor='#009387' barStyle="light-content"/>
//         <View style={styles.header}>
//             <Text style={styles.text_header}>Welcome!</Text>
//         </View>
//         <Animatable.View
//             animation="fadeInUpBig"
//             style={[styles.footer, {
//                 backgroundColor: colors.background
//             }]}
//         >
//             <Text style={[styles.text_footer, {
//                 color: colors.text
//             }]}>Email</Text>
//             <View style={styles.action}>
//                 <FontAwesome
//                     name="user-o"
//                     color={colors.text}
//                     size={20}
//                 />
//                 <TextInput
//                     placeholder="Your Email_ID"
//                     placeholderTextColor="#666666"
//                     style={[styles.textInput, {
//                         color: colors.text
//                     }]}
//                     autoCapitalize="none"

//                     value={email}
//                     onChangeText={(text)=>setEmail(text)}
//                     mode="outlined"
//                     //onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
//                 />
//                 {/* {data.check_textInputChange ?
//                 <Animatable.View
//                     animation="bounceIn"
//                 >
//                     <Feather
//                         name="check-circle"
//                         color="green"
//                         size={20}
//                     />
//                 </Animatable.View>
//                 : null} */}
//             </View>
//             {/* { data.isValidUser ? null :
//             <Animatable.View animation="fadeInLeft" duration={500}>
//             <Text style={styles.errorMsg}>Username must be 10 characters long.</Text> */}
//             {/* </Animatable.View>
//             } */}
//             <Text style={[styles.text_footer, {
//                 color: colors.text
//             }]}>Contact Number</Text>
//             <View style={styles.action}>
//                 <FontAwesome
//                     name="user-o"
//                     color={colors.text}
//                     size={20}
//                 />
//                 <TextInput
//                     placeholder="Your contact number"
//                     placeholderTextColor="#666666"
//                     style={[styles.textInput, {
//                         color: colors.text
//                     }]}
//                     autoCapitalize="none"
//                     value={Number}
//                     onChangeText={(text)=>setNumber(text)}
//                     mode="outlined"
//                    // onChangeText={(val) => textInputChange(val)}
//                    // onEndEditing={(e)=>handleValidUser(e.nativeEvent.text)}
//                 />
//                 {/* {data.check_textInputChange ?
//                 <Animatable.View
//                     animation="bounceIn"
//                 >
//                     <Feather
//                         name="check-circle"
//                         color="green"
//                         size={20}
//                     />
//                 </Animatable.View>
//                 : null} */}
//             </View>
//             { data.isValidUser ? null :
//             <Animatable.View animation="fadeInLeft" duration={500}>
//             {/* <Text style={styles.errorMsg}>Username must be 4 characters long.</Text> */}
//             </Animatable.View>
//             }

//             <Text style={[styles.text_footer, {
//                 color: colors.text,
//                 marginTop: 5
//             }]}>Password</Text>
//             <View style={styles.action}>
//                 <Feather
//                     name="lock"
//                     color={colors.text}
//                     size={20}
//                 />
//                 <TextInput
//                     placeholder="Your Password"
//                     placeholderTextColor="#666666"
//                     secureTextEntry={data.secureTextEntry ? true : false}
//                     style={[styles.textInput, {
//                         color: colors.text
//                     }]}
//                     autoCapitalize="none"
//                     mode="outlined"
//                     value={password}
//                     onChangeText={(text)=>setPassword(text)}
//                 />
//                 {/* <TouchableOpacity
//                     onPress={updateSecureTextEntry}
//                 >
//                     {data.secureTextEntry ?
//                     <Feather
//                         name="eye-off"
//                         color="grey"
//                         size={20}
//                     />
//                     :
//                     <Feather
//                         name="eye"
//                         color="grey"
//                         size={20}
//                     />
//                     }
//                 </TouchableOpacity> */}
//             </View>
//             {/* { data.isValidPassword ? null :
//             <Animatable.View animation="fadeInLeft" duration={500}>
//             <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
//             </Animatable.View>
//             } */}


//             <TouchableOpacity>
//                 <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
//             </TouchableOpacity>
//             <View style={styles.button}>
//                 <TouchableOpacity
//                     style={[styles.signIn, {
//                         borderColor: '#009387',
//                         borderWidth: 1,
//                         marginTop: 15
//                     }]}
//                     onPress={()=>userLogin()}
//                 >
//                     <Text style={[styles.textSign, {
//                         color:'#009387'
//                     }]}>Sign In</Text>
//                 </TouchableOpacity>

//                 <TouchableOpacity onPress={()=>navigation.navigate('Login')}><Text style={{textAlign:"center"}}>Dont have an account ?</Text></TouchableOpacity>

//                 <TouchableOpacity
//                     onPress={() => navigation.navigate('Profile')}
//                     style={[styles.signIn, {
//                         borderColor: '#009387',
//                         borderWidth: 1,
//                         marginTop: 5
//                     }]}
//                 >
//                     <Text style={[styles.textSign, {
//                         color: '#009387'
//                     }]}>Emergency</Text>
//                 </TouchableOpacity>
//             </View>
//         </Animatable.View>
//       </View>
//     );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#009387'
//     },
//     header: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         paddingHorizontal: 20,
//         paddingBottom: 50
//     },
//     footer: {
//         flex: 3,
//         backgroundColor: '#fff',
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         paddingHorizontal: 20,
//         paddingVertical: 30
//     },
//     text_header: {
//         color: '#fff',
//         fontWeight: 'bold',
//         fontSize: 30
//     },
//     text_footer: {
//         color: '#05375a',
//         fontSize: 18
//     },
//     action: {
//         flexDirection: 'row',
//         marginTop: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#f2f2f2',
//         paddingBottom: 5
//     },
//     actionError: {
//         flexDirection: 'row',
//         marginTop: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#FF0000',
//         paddingBottom: 5
//     },
//     textInput: {
//         flex: 1,
//         marginTop: Platform.OS === 'ios' ? 0 : -12,
//         paddingLeft: 10,
//         color: '#05375a',
//     },
//     errorMsg: {
//         color: '#FF0000',
//         fontSize: 14,
//     },
//     button: {
//         alignItems: 'center',
//         marginTop: 0
//     },
//     signIn: {
//         width: '100%',
//         height: 35,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10
//     },
//     textSign: {
//         fontSize: 18,
//         fontWeight: 'bold'
//     }
//   });
