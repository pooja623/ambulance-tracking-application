import React, {useRef, useEffect} from 'react';
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
  import { NavigationContainer } from '@react-navigation/native';


  const SplashScreen = ({ navigation }) => {
    const moveAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.sequence([
        Animated.timing(moveAnim, {
          duration: 2000,
          toValue: Dimensions.get('window').width / 1.6,
          delay: 0,
          useNativeDriver: false,
        }),
        Animated.timing(moveAnim, {
          duration: 2000,
          toValue: 0,
          delay: 0,
          useNativeDriver: false,
        }),
      ]).start();
      Animated.timing(fadeAnim, {
        duration: 2000,
        toValue: 1,
        delay: 2000,
        useNativeDriver: false,
      }).start();
    }, [moveAnim, fadeAnim]);

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.contentContainer}>
          <Animated.Image
            style={[styles.image, {opacity: fadeAnim}]}
            source={require('../assets/images/Ambulance.png')}
          />
          <Animated.View style={[styles.logoContainer, {marginLeft: moveAnim}]}>
            <Text style={[styles.logoText]}>W</Text>
            <Animated.Text style={[styles.logoText, {opacity: fadeAnim}]}>
              elcome
            </Animated.Text>
          </Animated.View>
        </View>
        <View style={styles.contentContainer}>
          <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
          style={[styles.TouchText]}>
            <Text style={[styles.BeginText]}>Let's Begin</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

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

  export default SplashScreen;
