import React, { useState, useEffect } from "react";
import { Button, SafeArea, PermissionsAndroid, StatusBar, StyleSheet, Text, View, Dimensions, Alert, TextInput, Form } from "react-native";
import MapView, {Marker} from "react-native-maps";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RNSettings from 'react-native-settings';
import NetInfo from "@react-native-community/netinfo";
import SendSMS from 'react-native-sms';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from 'react-native-maps-directions';

// Creating Stack

const Stack = createNativeStackNavigator();

// Checking all Permissions

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

// Checking Location

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
        <Stack.Screen name='Sign-Up' component={SignUpScreen} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='validation' component={ValidationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Home Page

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

      <Button 
        title="Sign-Up "
        onPress={() =>{
          navigation.navigate('Sign-Up');
        }}
      />

      <Button 
        title="Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
      />

    </View>
  );
};

// Map View

const MapScreen =  ({ navigation }) => {
  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });
  const [position1, setPosition1] = useState({
    latitude: 0.05,
    longitude: 0.05,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });
  const [position2, setPosition2] = useState({
    latitude: 0.05,
    longitude: 0.05,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });
  const [position3, setPosition3] = useState({
    latitude: 0.05,
    longitude: 0.05,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });
  const [position4, setPosition4] = useState({
    latitude: 0.05,
    longitude: 0.05,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });
  const [des, setDes] = useState({
    latitude: 0.05,
    longitude: 0.05,
    latitudeDelta: 1,
    longitudeDelta: 1,
  });
  useEffect(() =>{
    Geolocation.getCurrentPosition((pos) =>{
      const crd = pos.coords;
      setPosition({
        latitude : crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09
      });
      setDes({
        latitude : crd.latitude + 0.002,
        longitude: crd.longitude + 0.002,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09
      });
      setPosition1({
        latitude : crd.latitude + 0.0009,
        longitude: crd.longitude + 0.0009,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09
      });
      setPosition2({
        latitude : crd.latitude - 0.0009,
        longitude: crd.longitude - 0.0009,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09
      });
      setPosition3({
        latitude : crd.latitude - 0.0009,
        longitude: crd.longitude + 0.0009,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09
      });
      setPosition4({
        latitude : crd.latitude + 0.0009,
        longitude: crd.longitude - 0.0009,
        latitudeDelta: 0.09,
        longitudeDelta: 0.09
      });
      console.log(position)
    },(err) =>{
      console.log(err);
    });
    
  }, []);
  
  return (
      <View>
        <MapView style={styles.map}
          initialRegion = {position}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          showsCompass={true}
          scrollEnabled={true}
          zoomEnabled={true}
          pitchEnabled={true}>
            <Marker 
            coordinate={position}
            title={'Current Location'}
            description={'This is Your current Location!'}/>
            {/* // Hado homa random Drivers */}
            <Marker 
            coordinate={position1}
            title={'Current Location'}
            pinColor='yellow'
            description={'This is Your current Location!'}/> 
            <Marker 
            coordinate={position2}
            title={'Current Location'}
            pinColor='yellow'
            description={'This is Your current Location!'}/> 
            <Marker 
            coordinate={position3}
            title={'Current Location'}
            pinColor='yellow'
            description={'This is Your current Location!'}/> 
            <Marker 
            coordinate={position4}
            title={'Current Location'}
            pinColor='yellow'
            description={'This is Your current Location!'}/>  
            <Marker 
            coordinate={des}
            title={'destination Location'}
            pinColor='blue'
            description={'This is Your destination Location!'}/>
            <MapViewDirections 
            origin={position}
            destination={des}
            apikey={'AIzaSyC5Uv9S6jygQfUr9OtLwbm9InWr_G17fBM'}
            strokeWidth={3}
            strokeColor="hotpink"
          />  
          </MapView>
          
          <Button style={styles.btn}
          title="Search"
          onPress={() => {}}
          /> 
          <TextInput 
          style={styles.input}
            onChangeText={()=>{}}
            placeholder='Destination'
          />
      </View>
  );
};

// hado khorti nta3 sign up w validation sms

const ValidationScreen = ({ navigation, route }) =>{
  verify = route.params.paramKey
  const {text, setText} = useState('');
  const onPressHandler =(event) =>{
    if (verify === text) {
      console.log('Code is Correct!');
    } else {
      console.log("Code Is Wrong! Try again");
    }
  }
  return(
    <View>
      <TextInput value={text} placeholder="Verification code" onChangeText={setText} />
      <Button
        title="Verify"
        onPress={onPressHandler}
       />
    </View>
  )
}

const SignUpScreen = ({ navigation }) =>{
  code = "pickUp";
  const [userName ,setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [number, setNumber] = useState('');
  const submitHandler = (event) =>{
    console.log(number)
    SendSMS.send({
      body: `Hi ${userName}$ The Validation Code is ${code}$`,
      recipients: [number],
      successTypes : ['send'],
      allowAndroidSendWithoutReadPermission: true,
    },(complete, cancel, err) =>{
      console.log('Sms has been sent! ');
    })
    navigation.navigate('validation', {paramKey : code});
  }

  return (
    <View>
      <TextInput value = {userName} placeholder = 'UserName' onChangeText = {setUserName} style = {styles.input} />
      <TextInput value = {pwd} placeholder = "Password" onChangeText = {setPwd} style = {styles.input} secureTextEntry={true} />
      <TextInput value = {number} placeholder = 'Phone Number' onChangeText = {setNumber} keyboardType = "numeric" style = {styles.input} />
      <Button
        title="Submit" 
        onPress={() =>{
          submitHandler()
        }}
      />
    </View>
  )
}

const LoginScreen = ({ navigation }) =>{
  return (
    <View>
      <Text> Login Screen </Text>
    </View>
  )
}

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
    height: "80%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color : "#000"
  },
  btn: {
    right: 100,
    top: 200,
    backgroundColor: "black",
    elevation: 10,
  }
});

export default App;