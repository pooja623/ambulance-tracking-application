import { NavigationContainer } from '@react-navigation/native';
import React, {Component , useState , useRef} from 'react';
import MapViewDirections from 'react-native-maps-directions';
import firestore from '@react-native-firebase/firestore'

import {
  StyleSheet,
  Button,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import haversine from "haversine";
navigator.geolocation = require('@react-native-community/geolocation');
import Icon from 'react-native-vector-icons/FontAwesome';
const MyIcon = <Icon name="ambulance" size={30} color="#900" />;


// const LATITUDE = 29.95539;
// const LONGITUDE = 78.07513;
const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 27.70169;
const LONGITUDE = 85.3206;

const sendNoti =( )=>{
  firestore().collection('usertoken').get().then(querysnap=>{
    const userDevicetoken = querysnap.docs.map(docSnap=>{
      return docSnap.data().token

    })
     console.log(userDevicetoken);
     fetch('https://75ba-27-34-22-185.ngrok.io/send-noti',{
       method:'post',
       headers:{
         'Content-Type':'application/json'

       },
       body:JSON.stringify({
         tokens:userDevicetoken
       })
     })
  })

}

class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      routeCoordinates: [],
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      })
    };
  }

  componentDidMount() {
    const { coordinate } = this.state;

    this.watchID = navigator.geolocation.watchPosition(
      position => {
        const { routeCoordinates, distanceTravelled } = this.state;
        const { latitude, longitude } = position.coords;

        const newCoordinate = {
          latitude,
          longitude
        };

        if (Platform.OS === "android") {
          if (this.marker) {
            this.marker.animateMarkerToCoordinate(
              newCoordinate,
              500
            );
          }
        } else {
          coordinate.timing(newCoordinate).start();
        }

        this.setState({
          latitude,
          longitude,
          routeCoordinates: routeCoordinates.concat([newCoordinate]),
          distanceTravelled:
            distanceTravelled + this.calcDistance(newCoordinate),
          prevLatLng: newCoordinate
        });
      },
      error => console.log(error),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 100
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    return (
      <View style={styles.container}>

        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}
        >
          <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
        </MapView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomCard}>
        <Text>Emergency</Text>
        <Button
          color="#52b372"
          title="Ambulance"
          onPress={() => sendNoti()}
        />


      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    //...StyleSheet.absoluteFillObject,
    //justifyContent: "flex-end",
    //alignItems: "center"
    flex:1,
  },
  map: {
    flex:1,
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  latlng: {
    width: 200,
    alignItems: "stretch"
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 10
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent"
  },
  bottomCard:{
    backgroundColor: 'white',

    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24
  },
  inputStyle:{
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth:1,
    alignItems: 'center',
    height: 48,
    justifyContent:'center',
    marginTop: 16
  }
});

export default ProfileScreen;

// const ProfileScreen = ({navigation})  => {
//   const [state, setState] = useState({
//     pickupCords: {
//       latitude:27.6889 ,
//       longitude: 85.3602,
//       latitudeDelta: 0.0921,
//       longitudeDelta: 0.0421,

//     },
//     destinationCords: {
//       latitude: 27.6915,
//       longitude: 85.3420,
//       latitudeDelta: 0.0921,
//       longitudeDelta:0.0421,

//     }
//   })

//   const mapRef = useRef()
//   const {pickupCords,destinationCords} = state

//    const onPressLocation = () => {
//      navigation.navigate('ChooseLocation', {getCordinate: fetchvalues})
//    }

//    const fetchvalues = (data) =>{
//      /*setState({
//        pickupCords: {
//         latitude: data.destinationCords.latitude,
//         longitude: data.destinationCords.longitude

//        },
//       destinationCords: {
//         latitude: data.pickupCords.latitude,
//         longitude: data.pickupCords.longitude
//       }
//      })*/
//      console.log("data=====>>>>>",data)
//    }


//   return(
//     <View style={styles.container} >
//       <View style={{ flex:1 }}>
//       <MapView
//        ref={mapRef}
//        initialRegion={
//          {
//            ...pickupCords,
//            latitudeDelta:0.0921,
//            longitudeDelta:0.0421,
//          }
//        }
//        style={StyleSheet.absoluteFill}>
//          <Marker
//          coordinate={{...pickupCords}}
//          />
//          <Marker
//         coordinate={{...destinationCords}}
//         />

//         <MapViewDirections
//           origin={{...pickupCords}}
//           destination={{...destinationCords}}
//           apikey={"AIzaSyB9DSBTS9olaYAtqGJQAvGutWEbVnRnVBo"}
//           strokeWidth={3}
//           strokeColor="hotpink"
//           optimizeWaypoints={true}
//           onReady={result => {
//             mapRef.current.fitToCoordinates(result.coordinate, {
//               edgePadding:{
//                 right: 40,
//                 bottom: 300,
//                 left: 40,
//                 top: 100,
//               }
//             })
//           }}
//         />
//       </MapView>
//       </View>
//       <View style={styles.bottomCard}>
//         <Text>Where are you going?</Text>
//           <TouchableOpacity
//           style={styles.inputStyle}
//           onPress={onPressLocation}

//           >
//             <Text> Choose Location</Text>
//           </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex:1,

//   },
//   bottomCard:{
//     backgroundColor: 'white',

//     padding: 30,
//     borderTopEndRadius: 24,
//     borderTopStartRadius: 24
//   },
//   inputStyle:{
//     backgroundColor: 'white',
//     borderRadius: 4,
//     borderWidth:1,
//     alignItems: 'center',
//     height: 48,
//     justifyContent:'center',
//     marginTop: 16
//   }
// });



// export default ProfileScreen;






