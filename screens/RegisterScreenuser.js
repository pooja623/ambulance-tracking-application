import React, { Component } from 'react';
import {useState} from 'react'
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Platform,
    Alert,
    StyleSheet,
    ScrollView,
    StatusBar,
    ActivityIndicator
} from 'react-native';
//import { Button } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
//import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage'
//import DocumentPicker from "react-native-document-picker";
import auth, { firebase } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
//import firebase from '../database/firebase';
//import {v4 as uuidv4} from 'uuid';
export default class RegisterScreen extends Component {
//  pickImageAndUpload = ()=>{
//       launchImageLibrary({quality:0.5},(fileobj)=>{
//           const uploadTask =  storage().ref().child(`/userprofile/${Date.now()}`).putFile(fileobj.assets[0].uri)
//                 uploadTask.on('state_changed',
//                  (snapshot) => {

//                     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     if(progress==100) alert('image uploaded')

//                 },
//                 (error) => {
//                     alert("error uploading image")
//                 },
//                 () => {
//                     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//                     setImage(downloadURL)
//                     });
//                 }
//                 );
//         })
//     }

  constructor() {
    super();
    this.state = {
      displayName: '',
      email: '',
      password: '',
      contactNumber:'',
      isLoading: false
    }
  }
  updateInputVal = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  }
  registerUser = () => {
    if(this.state.email === '' && this.state.password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      this.setState({
        isLoading: true,
      })
      firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        res.user.updateProfile({
          displayName: this.state.displayName,
          contactNumber: this.state.contactNumber
        })
        console.log('User registered successfully!')
        this.setState({
          isLoading: false,
          displayName: '',
          email: '',
          password: '',
          contactNumber:''

        })
        this.props.navigation.navigate('Register')
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
          placeholder="Name"
          value={this.state.displayName}
          onChangeText={(val) => this.updateInputVal(val, 'displayName')}
        />
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
         <TextInput
          style={styles.inputStyle}
          placeholder="Contact Number"
          value={this.state.contactNumber}
          onChangeText={(val) => this.updateInputVal(val, 'contactNumber')}
          maxLength={15}
          secureTextEntry={true}
        />

        <Button
          color="#52b372"
          title="Signup"
          onPress={() => this.registerUser()}
        />
 {/* <TouchableOpacity
                    onPress={()=>this.pickImageAndUpload()}
                    style={[styles.signIn, {
                        borderColor: '#52b372',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#52b372'
                    }]}>Upload Document</Text>
                </TouchableOpacity> */}
        <Text
          style={styles.loginText}
          onPress={() => this.props.navigation.navigate('Register')}>
          Already Registered? Click here to login
        </Text>
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
  },
  signIn: {
         width: '100%',
         height: 50,
         justifyContent: 'center',
         alignItems: 'center',
         borderRadius: 10
    },
});

// export default function RegisterScreen({navigation}) {
//     const pickImageAndUpload = ()=>{
//         launchImageLibrary({quality:0.5},(fileobj)=>{

//          const uploadTask =  storage().ref().child(`/userprofile/${Date.now()}`).putFile(fileobj.assets[0].uri)
//                 uploadTask.on('state_changed',
//                  (snapshot) => {

//                     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                     if(progress==100) alert('image uploaded')

//                 },
//                 (error) => {
//                     alert("error uploading image")
//                 },
//                 () => {
//                     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//                     setImage(downloadURL)
//                     });
//                 }
//                 );
//         })
//     }

// //     const pickDocumentAndUpload = ()=>{
// //         // Pick a single file

// //           const res =  storage().ref().child(`/userprofile/${DocumentPicker.pick({ type: [DocumentPicker.types.allFiles]
// //           })}`).putFile(Fileobj.assets[0].uri)
// //            //by using allFiles type, you will able to pick any type of media from user device,
// //         //There can me more options as well
// //         //DocumentPicker.types.images: All image types
// //         //DocumentPicker.types.plainText: Plain text files
// //         //DocumentPicker.types.audio: All audio types
// //        //DocumentPicker.types.pdf: PDF documents
// //        //DocumentPicker.types.zip: Zip files
// //        //DocumentPicker.types.csv: Csv files
// //        //DocumentPicker.types.doc: doc files
// //        //DocumentPicker.types.docx: docx files
// //       //DocumentPicker.types.ppt: ppt files
// //       //DocumentPicker.types.pptx: pptx files
// //       //DocumentPicker.types.xls: xls files
// //       //DocumentPicker.types.xlsx: xlsx files
// //       //For selecting more more than one options use the
// //      //type: [DocumentPicker.types.csv,DocumentPicker.types.xls]



// //      res.on('state_changed',
// //      (snapshot) => {

// //         var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
// //         if(progress==100) alert('image uploaded')

// //     },
// //     (error) => {
// //         alert("error uploading image")
// //     },
// //     () => {
// //         res.snapshot.ref.getDownloadURL().then((downloadURL) => {
// //         setImage(downloadURL)
// //         });
// //     }
// //     );

// // }
// const [email,setEmail] = useState('')
// const [password,setPassword] = useState('')
// const [confirm_password,setConfirmPassword] = useState('')
// const [image,setImage] = useState(null)
// const [showNext,setShowNext] = useState(false)
// const [loading,setLoading] = useState(false)
// if(loading){
//     return  <ActivityIndicator size="large" color="#00ff00" />
// }
// const userSignup = async ()=>{
//     setLoading(true)
//     if(!email || !password || !confirm_password || !image){
//            alert("please add all the field")
//            return
//     }
//     try{
//       const result =  await auth().createUserWithEmailAndPassword(email,password)
//         firestore().collection('users').doc(result.user.uid).set({
//             email:result.user.email,
//             uid:result.user.uid,
//             pic:image,
//             status:"online"
//         })
//         setLoading(false)
//     }catch(err){
//         alert("something went wrong")
//     }
// }
// const [data, setData] = React.useState({
//     username: '',
//     password: '',
//     confirm_password: '',
//     check_textInputChange: false,
//     secureTextEntry: true,
//     confirm_secureTextEntry: true,
// });


// //     const textInputChange = (val) => {
// //         if( val.length !== 0 ) {
// //             setData({
// //                 ...data,
// //                 username: val,
// //                 check_textInputChange: true
// //             });
// //         } else {
// //             setData({
// //                 ...data,
// //                 username: val,
// //                 check_textInputChange: false
// //             });
// //         }
// //     }

// //     const handlePasswordChange = (val) => {
// //         setData({
// //             ...data,
// //             password: val
// //         });
// //     }

// //     const handleConfirmPasswordChange = (val) => {
// //         setData({
// //             ...data,
// //             confirm_password: val
// //         });
// //     }

//     const updateSecureTextEntry = () => {
//         setData({
//             ...data,
//             secureTextEntry: !data.secureTextEntry
//         });
//     }

//     const updateConfirmSecureTextEntry = () => {
//         setData({
//             ...data,
//             confirm_secureTextEntry: !data.confirm_secureTextEntry
//         });
//     }


//     return (
//       <View style={styles.container}>
//           <StatusBar backgroundColor='#009387' barStyle="light-content"/>
//         <View style={styles.header}>
//             <Text style={styles.text_header}>Register Now!</Text>
//         </View>
//         <Animatable.View
//             animation="fadeInUpBig"
//             style={styles.footer}
//         >
//             <ScrollView>
//             <Text style={styles.text_footer}>Email_ID</Text>
//             <View style={styles.action}>
//                 <FontAwesome
//                     name="user-o"
//                     color="#05375a"
//                     size={20}
//                 />
//                 <TextInput
//                     placeholder="Your Email"
//                     style={styles.textInput}
//                     autoCapitalize="none"
//                     value={email}
//                     onChangeText={(text)=>setEmail(text)}
//                     mode="outlined"
//                 />
//                 {data.check_textInputChange ?
//                 <Animatable.View
//                     animation="bounceIn"
//                 >
//                     <Feather
//                         name="check-circle"
//                         color="green"
//                         size={20}
//                     />
//                 </Animatable.View>
//                 : null}
//             </View>

//             <Text style={[styles.text_footer, {
//                 marginTop: 35
//             }]}>Password</Text>
//             <View style={styles.action}>
//                 <Feather
//                     name="lock"
//                     color="#05375a"
//                     size={20}
//                 />
//                 <TextInput
//                     placeholder="Your Password"
//                     secureTextEntry
//                     style={styles.textInput}
//                     autoCapitalize="none"
//                     label="password"
//                     mode="outlined"
//                     value={password}
//                     onChangeText={(text)=>setPassword(text)}
//                 />
//                 <TouchableOpacity
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
//                 </TouchableOpacity>
//             </View>

//             <Text style={[styles.text_footer, {
//                 marginTop: 35
//             }]}>Confirm Password</Text>
//             <View style={styles.action}>
//                 <Feather
//                     name="lock"
//                     color="#05375a"
//                     size={20}
//                 />
//                 <TextInput
//                     placeholder="Confirm Your Password"
//                     secureTextEntry
//                     style={styles.textInput}
//                     autoCapitalize="none"
//                     label="confirm_password"
//                     mode="outlined"
//                     value={confirm_password}
//                     onChangeText={(text)=>setConfirmPassword(text)}
//                 />
//                 <TouchableOpacity
//                     onPress={updateConfirmSecureTextEntry}
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
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.textPrivate}>
//                 <Text style={styles.color_textPrivate}>
//                     By signing up you agree to our
//                 </Text>
//                 <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
//                 <Text style={styles.color_textPrivate}>{" "}and</Text>
//                 <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
//             </View>
//             <View style={styles.button}>
//             <TouchableOpacity
//                     onPress={()=>pickImageAndUpload()}
//                     style={[styles.signIn, {
//                         borderColor: '#009387',
//                         borderWidth: 1,
//                         marginTop: 15
//                     }]}
//                 >
//                     <Text style={[styles.textSign, {
//                         color: '#009387'
//                     }]}>Upload Image</Text>
//                 </TouchableOpacity>
//                 {/* <TouchableOpacity
//                     onPress={()=>pickDocumentAndUpload()}
//                     style={[styles.signIn, {
//                         borderColor: '#009387',
//                         borderWidth: 1,
//                         marginTop: 15
//                     }]}
//                 >
//                     <Text style={[styles.textSign, {
//                         color: '#009387'
//                     }]}>Upload Image</Text>
//                 </TouchableOpacity> */}

//                 <TouchableOpacity
//                     onPress={() => navigation.navigate('Register')}
//                     style={[styles.signIn, {
//                         borderColor: '#009387',
//                         borderWidth: 1,
//                         marginTop: 15
//                     }]}
//                 >
//                     <Text style={[styles.textSign, {
//                         color: '#009387'
//                     }]}>Sign UP</Text>
//                 </TouchableOpacity>


//             </View>
//             </ScrollView>
//         </Animatable.View>
//       </View>
//     );
// };

// //export default RegisterScreen;

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
//         flex: Platform.OS === 'ios' ? 3 : 5,
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
//     textInput: {
//         flex: 1,
//         marginTop: Platform.OS === 'ios' ? 0 : -12,
//         paddingLeft: 10,
//         color: '#05375a',
//     },
//     button: {
//         alignItems: 'center',
//         marginTop: 50
//     },
//     signIn: {
//         width: '100%',
//         height: 50,
//         justifyContent: 'center',
//         alignItems: 'center',
//         borderRadius: 10
//     },
//     textSign: {
//         fontSize: 18,
//         fontWeight: 'bold'
//     },
//     textPrivate: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         marginTop: 20
//     },
//     color_textPrivate: {
//         color: 'grey'
//     }
//   });
