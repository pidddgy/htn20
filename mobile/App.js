import { StatusBar } from 'expo-status-bar';
import React, { useEffect, Component } from 'react';
import { Picker, StyleSheet,View, Text, AsyncStorageStatic, SafeAreaView, ScrollView, TextInput } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    scrollView: {
      marginHorizontal: 20,
    },
    text: {
      fontSize: 20,
    },
  });

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

      <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
        <Text>
            Your Token is: (token)
        </Text>
        <ScrollView style={{margin:10, maxHeight: 400 }} nestedScrollEnabled={true} >

        <Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text>

            <Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text><Text h3 style={{ fontWeight: 'bold', fontSize: 16}}>
                person name
            </Text>

            <Text>
                text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here text goes here 
            </Text>


        </ScrollView>
        </View>
        <View>
            <Text> Comma-separated list of keywords: </Text>
            <View style={{backgroundColor: '#CDCDCD'}}>
                <TextInput> </TextInput>
            </View>
        </View>

        <View>

        <Text> {"\n \n"}Send a response: </Text>

      <Picker
        style={{ height: 50, width: 150 }}
        // onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
          {
              ['yes', 'no', 'my wifi isnt working', 'my mic isnt working', 'give me a second'].map((val) => {
                    var k = Math.random();
                  return <Picker.Item key = {k} label={val} value={val} />
              })
          }
        {/* <Picker.Item label="yes" value="yes" /> */}
        {/* <Picker.Item label="no" value="no" /> */}

      </Picker>
        </View>
      </ScrollView>

    </SafeAreaView>
    


    </View>
  );
}

