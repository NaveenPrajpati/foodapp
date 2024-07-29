import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  TextInput,
  Pressable,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import ButtonMy from './elements/ButtonMy';
import VectorIcon from './VectorIcon';

const MapPicker = () => {
  const navigation = useNavigation();
  const [region, setRegion] = useState(null);
  const [address, setAddress] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [boxCrod, setBoxCord] = useState([]);

  useEffect(() => {
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
  }, []);

  async function geocode() {
    //geocoding convert address into longitude and latitude

    const accessToken = 'pk.bf40de91978dff0aa9233833c69e28f2';
    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/search?key=${accessToken}&q=${searchInput}&format=json`,
      );

      const cord = response.data[0];
      console.log(cord);
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
    const accessToken = 'pk.bf40de91978dff0aa9233833c69e28f2';

    try {
      const response = await axios.get(
        `https://us1.locationiq.com/v1/reverse?key=${accessToken}&lat=${latitude}&lon=${longitude}&format=json`,
      );

      setAddress(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegionChangeComplete = region => {
    setRegion(region);
    fetchAddress(region.latitude, region.longitude);
  };

  return (
    <View style={styles.container}>
      {region && (
        <MapView
          style={styles.map}
          region={region}
          // initialRegion={region}
          showsMyLocationButton={true}
          onRegionChangeComplete={handleRegionChangeComplete}
        />
      )}
      <View className="  w-full flex-row items-center  space-x-2 justify-center absolute top-5">
        <TextInput
          className=" border rounded-md w-9/12  text-black"
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
