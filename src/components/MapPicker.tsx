import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import ButtonMy from './elements/ButtonMy';
import VectorIcon from './VectorIcon';
import {debounce, set} from 'lodash';
import {LocationIq_Token} from '../../credientials';
import {decodePolyline} from '../utils/utilityFunctions';
import {socket} from '../services/endPoints';

const MapPicker = ({route}) => {
  const {tracking = false, pickup, deliveryBoy, destination} = route.params;
  const navigation = useNavigation();
  const [delivery, setDelivery] = useState(deliveryBoy);
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [boxCrod, setBoxCord] = useState([]);
  const [routeCoords, setRouteCoords] = useState([]);
  const [duration, setDuration] = useState(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    console.log('effect');
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922, // Add deltas for initial zoom level
          longitudeDelta: 0.0421,
        });
      },

      error => {
        console.error(error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );

    socket.on('deliverLocation', cord => {
      setDelivery(cord);
    });
    const fetchRoute = async () => {
      const origin = `${delivery[0]},${delivery[1]}`;
      const dest = `${destination[0]},${destination[1]}`;
      const waypoint = `${pickup[0]},${pickup[1]}`;
      getDirections(origin, dest, waypoint);
      // setRouteCoords(directions);
    };

    fetchRoute();
  }, []);

  const getDirections = async (origin, destination, waypoints) => {
    const accessToken = LocationIq_Token;
    const url = `https://us1.locationiq.com/v1/directions/driving/${origin};${waypoints};${destination}?key=${accessToken}&alternatives=true&steps=true&geometries=polyline&overview=full&annotations=true`;

    try {
      const response = await axios.get(url);
      setDuration(response.data.routes[0].duration);
      setDistance(response.data.routes[0].distance);
      setRouteCoords(response.data.routes[0].geometry);
    } catch (error) {
      console.error(error);
    }
  };

  async function geocode() {
    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${LocationIq_Token}&q=${searchInput}&format=json`,
      );
      const cord = response.data[0];
      // console.log(cord);
      setRegion({
        latitude: parseFloat(cord.lat),
        longitude: parseFloat(cord.lon),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/reverse?key=${LocationIq_Token}&lat=${latitude}&lon=${longitude}&format=json`,
      );
      setAddress(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const debouncedFetchAddress = useCallback(
    debounce((latitude, longitude) => {
      fetchAddress(latitude, longitude);
    }, 1000),
    [],
  );

  const handleRegionChangeComplete = region => {
    setRegion(region);
    // fetchAddress(region.latitude, region.longitude);
    debouncedFetchAddress(region.latitude, region.longitude);
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          // initialRegion={region}
          // showsUserLocation={true}
          onRegionChangeComplete={handleRegionChangeComplete}>
          {tracking && (
            <>
              <Marker
                coordinate={{latitude: pickup[1], longitude: pickup[0]}}
                pinColor="green"></Marker>
              <Marker
                coordinate={{
                  latitude: destination[1],
                  longitude: destination[0],
                }}
                pinColor="red"
                title={'me'}
              />
              <Marker
                coordinate={{
                  latitude: delivery[1],
                  longitude: delivery[0],
                }}
                title={'delivery Man'}>
                <Image
                  source={require('../assets/images/delivery-bike.png')}
                  style={{width: 30, height: 30}}
                  resizeMode="contain"
                />
              </Marker>

              {routeCoords && (
                <Polyline
                  coordinates={decodePolyline(routeCoords)} // Use decoded polyline
                  strokeWidth={4}
                  strokeColor="black"
                />
              )}
            </>
          )}
        </MapView>
      )}

      {!tracking && (
        <>
          <View className="  w-full flex-row items-center gap-2 justify-start absolute top-2">
            <TextInput
              className=" border rounded-md w-7/12  text-black px-2"
              onChangeText={setSearchInput}
              placeholder="Search Here"
              placeholderTextColor={'black'}
            />
            <Pressable onPress={geocode} className=" bg-black p-2 rounded-full">
              <VectorIcon iconName="search" size={15} color="white" />
            </Pressable>
          </View>
          <View style={styles.markerFixed}>
            <View style={styles.marker} />
          </View>
          <View style={styles.addressContainer}>
            <Text className=" text-black">{address.display_name}</Text>
          </View>

          <ButtonMy
            textButton="Confirm Location"
            onPress={() => {
              navigation.navigate('AddressList', {address});
            }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  markerFixed: {
    left: '50%',
    marginLeft: -24,
    marginTop: -48,
    position: 'absolute',
    top: '50%',
  },
  marker: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: 'red',
  },
  addressContainer: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
  },
});

export default MapPicker;
