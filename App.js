import React, { useState } from "react";
import { Button, PermissionsAndroid, StatusBar, StyleSheet, Text, View, Dimensions, Alert } from "react-native";
import MapView from "react-native-maps";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RNSettings from 'react-native-settings';
import NetInfo from "@react-native-community/netinfo";
const Stack = createNativeStackNavigator();
const checkPermission = async () =>{
  pass = false
  pass_location = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
  await NetInfo.fetch().then(state => {
    pass_wifi = state.isConnected;
  });

  await RNSettings.getSetting(RNSettings.LOCATION_SETTING).then((response) =>{
    if(response == RNSettings.ENABLED){
      pass_enabled = true
    } else{
      console.log('not Granted! check')
    }
  })
  console.log('Enabled is : ',pass_enabled);
  console.log('Network is : ', pass_wifi);
  console.log('Locations is :', pass_location);
  if(pass_enabled === true && pass_wifi === true && pass_location === true){
    pass = true;
  } else {
    pass = false
  }
  return pass;
}

const RequestLocation = async () => {
  try{
    const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title:'Access Location',
        message:'This App needs to access your location to! ',
        buttonPositive:'Access',
        buttonNegative:'Cancel',
        buttonNeutral:'Later'
      }).then(async (requested) =>{
        if (requested === PermissionsAndroid.RESULTS.GRANTED){
          console.log('Granted!');
          await RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS).then((res) =>{
            if (result === RNSettings.ENABLED){
              console.log('Enabled!')
            } 
          });
        } else{
          console.log('not Granted!')
        }
      })
  } catch (err){

  }
}

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Map' component={MapScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) =>{
  return (
    <View>
      <Text>Home</Text>
      <Button 
        title="Map Button"
        onPress={async()=> {
          await RequestLocation()
          goOn = await checkPermission()
          console.log(goOn);
          if (goOn === true){
            navigation.navigate('Map');
          } else {
            Alert.alert('Check Your Permissions');
          }
        }}
      />
    </View>
  );
};
const MapScreen = ({ navigation }) =>{
  return (
    <View>
      <MapView style={styles.map}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default App;