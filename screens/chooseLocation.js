import React from 'react';
import { View, Text, StyleSheet } from "react-native";
//import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useLinkProps, useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import AddressPickup from '../components/AddressPickup';
import CustomBotton from '../components/customButton';
import { useState } from 'react';




const ChooseLocation = (props) => {
  const navigation = useNavigation()

  const [state, setState] = useState({
    pickupCords: {},
    destinationCords: {}
  })
  const { pickupCords, destinationCords } = state
  console.log('hi')

  const onDone = () => {
    props.route.params.getCordinate({
      pickupCords,
      destinationCords
    })
    navigation.goBack()

  }
  const fetchpickupCords = (lat, lng) => {
    setState({
      ...state , pickupCords: {
        latitude: lat,
        longitute: lng
      }
    })
  }

  const fetchdestinationCords = (lat, lng) => {
    setState({
      ...state, destinationCords: {
        latitude: lat,
        longitute: lng
      }
    })
  }
  //console.log("props",props)
  console.log("pickup cords===>>>", pickupCords)
  console.log("destination cords===>>>", destinationCords)
  


 

  return (
    <View style={styles.container}>
      <ScrollView
      keyboardShouldPersistTaps="handled"
      style={{backgroundColor:'white', flex: 1, padding: 24}}>
      <AddressPickup
        placeholderText="Pickup Location"
        fetchAddress={fetchpickupCords}
      />
      <AddressPickup
        placeholderText="Destination Location"
        fetchAddress={fetchdestinationCords}
      />
      <CustomBotton 
      btnText="Done"
      btnStyle={{ marginTop: 24 }}
      onPress={onDone}
      />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
      flex:1,
  }
});


export default ChooseLocation;






{/*import React from 'react';
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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const ChooseLocation = ({ navigation , route}) => {
    return(
    <View style={styles.container}>
        <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
               key: 'AIzaSyB9DSBTS9olaYAtqGJQAvGutWEbVnRnVBo',
               language: 'en',
        }}
    />
          </View>
      );
};

const styles = StyleSheet({
    container: {
        flex:
    }
})

export default ChooseLocation;*/}