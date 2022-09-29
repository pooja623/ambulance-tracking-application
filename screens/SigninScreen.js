import React from 'react';
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


  const SigninScreen = ({ navigation , route}) => {
      return(
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
          <TouchableOpacity
        onPress={() => navigation.navigate('User')}
          style={[styles.TouchText, {
            borderColor: '#009387',
            borderWidth: 1,
            marginTop: 15
        }]}>
            <Text style={[styles.BeginText]}>Signin as a User</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
          style={[styles.TouchText, {
            borderColor: '#009387',
            borderWidth: 1,
            marginTop: 15
        }]}>
            <Text style={[styles.BeginText]}>Signin as a Driver</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      )
}
 export default SigninScreen;
 const styles = StyleSheet.create({
    TouchText: {
      backgroundColor: 'white',
      padding: 10,
      width:'50%',
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
       display: 'flex',
       flex: 1,
       backgroundColor: '#52b372',
     },
     logoText: {
       fontSize: 35,
       marginTop: 20,
       color: 'white',
       fontWeight: '700',
     },
     BeginText: {
      fontSize: 18,
      color: '#FF0000',
      fontWeight: 'bold',
      alignItems: 'center',
    },

     contentContainer: {
       top: '40%',
       alignItems: 'center',
       backgroundColor: 'AD40AF',

     },
     image: {
       width: 225,
       height: 110,
     },
     logoContainer: {
       flexDirection: 'row',
     },
   });
