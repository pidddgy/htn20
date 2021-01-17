import { StatusBar } from 'expo-status-bar';
import React, { useEffect, Component } from 'react';
import { View, Text, AsyncStorageStatic } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export default function App() {

  useEffect(() => {
    registerForPushNotification().then(token=>console.log(token));
  }, [])

  useEffect(() => {
    registerForPushNotification().then(test_fetch);
  }, [])

  async function test_fetch(expo_token){
    const address = 'api.osn-reo.org';
    fetch(`http://${address}/register`, {
        'method': 'POST',
        'headers': {
            'content-type': 'application/json'
        },
        'body': JSON.stringify({'expo_token': expo_token})
    }).then(res => logging(res));
  }

  async function logging(data) {
    let response = await data.json().then(res => res["app_token"]);
    console.log(response);
  }

  async function registerForPushNotification(){
    const {status} = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status != 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (status !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    return token
  }

  console.log("Built");

  return (
    <View style = {{
      backgroundColor: "#fff",
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Text>
        Your Token is: 
      </Text>
    </View>
  );
}

