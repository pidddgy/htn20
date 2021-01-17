import { StatusBar } from 'expo-status-bar';
import React, { useEffect, Component, useState } from 'react';
import { Picker, StyleSheet,View, Text, AsyncStorageStatic, SafeAreaView, ScrollView, TextInput, Button } from 'react-native';
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
const [app_token, setToken] = useState('NO_TOKEN');
const [context, setContext] = useState(
    [['Bort', 'Hai'], ['Marcoos', 'Hai']]
);
let a = '123'
async function getContext(token){
    let resp = await fetch(`https://api.osn-reo.org/context`, {
        'method': 'POST',
        'headers': {
            'content-type': 'application/json'
        },
        'body': JSON.stringify({'app_token': token})
    });
    resp = await resp.json()
    if(resp.context){
        setContext(resp.context);
    }
}
    
useEffect(() => {
    registerForPushNotification().then(test_fetch);
    console.log('here')
}, [])


async function test_fetch(expo_token){
    const address = 'api.osn-reo.org';
    fetch(`https://${address}/register`, {
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
    setToken(response);
    setInterval(getContext, 1000, response);
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
    return token;
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
            Your Token is: ({app_token})
        </Text>
        <ScrollView style={{margin:10, maxHeight: 400 }} nestedScrollEnabled={true} >

            {context.map(message => (
                <React.Fragment>
                    <Text h3 key={Math.random()*10000} style={{ fontWeight: 'bold', fontSize: 16}}> {message[0]} </Text>
                    <Text key={Math.random()*10000} > {message[1]} </Text>
                </React.Fragment>
            ))}

        </ScrollView>
        </View>
        <View>
            <Text> Comma-separated list of keywords: </Text>
            <View style={{backgroundColor: '#CDCDCD'}}>
                <TextInput> </TextInput>
            </View>
        </View>

        <View>
    <Button
        title="Yes"
        onPress={() => {
            fetch(`https://api.osn-reo.org/sendMessage`, {
                'method': 'POST',
                'headers': {
                    'content-type': 'application/json'
                },
                'body': JSON.stringify({'app_token': app_token, "msg": 'Yes'})
            });
        }}
    />
    <Button
        title="No"
        onPress={() => {
            fetch(`https://api.osn-reo.org/sendMessage`, {
                'method': 'POST',
                'headers': {
                    'content-type': 'application/json'
                },
                'body': JSON.stringify({'app_token': app_token, "msg": 'No'})
            });
        }}
    />
    <Button
        title="Im here"
        onPress={() => {
            fetch(`https://api.osn-reo.org/sendMessage`, {
                'method': 'POST',
                'headers': {
                    'content-type': 'application/json'
                },
                'body': JSON.stringify({'app_token': app_token, "msg": 'im here'})
            });
        }}
    />
    <Button
        title="My wifi isn't working"
        onPress={() => {
            fetch(`https://api.osn-reo.org/sendMessage`, {
                'method': 'POST',
                'headers': {
                    'content-type': 'application/json'
                },
                'body': JSON.stringify({'app_token': app_token, "msg": 'my wifi isn\'t working'})
            });
        }}
    />
    <Button
        title="give me a second"
        onPress={() => {
            fetch(`https://api.osn-reo.org/sendMessage`, {
                'method': 'POST',
                'headers': {
                    'content-type': 'application/json'
                },
                'body': JSON.stringify({'app_token': app_token, "msg": 'give me a second'})
            });
        }}
    />
    <Button
        title="what do you want hoe"
        onPress={() => {
            fetch(`https://api.osn-reo.org/sendMessage`, {
                'method': 'POST',
                'headers': {
                    'content-type': 'application/json'
                },
                'body': JSON.stringify({'app_token': app_token, "msg": 'what do you want hoe'})
            });
        }}
    />
    <Button
        title="my mic not work :("
        onPress={() => {
            fetch(`https://api.osn-reo.org/sendMessage`, {
                'method': 'POST',
                'headers': {
                    'content-type': 'application/json'
                },
                'body': JSON.stringify({'app_token': app_token, "msg": 'sorry, my mic isnt working'})
            });
        }}
    />
    <Button
        title="i dont know"
        onPress={() => {
            fetch(`https://api.osn-reo.org/sendMessage`, {
                'method': 'POST',
                'headers': {
                    'content-type': 'application/json'
                },
                'body': JSON.stringify({'app_token': app_token, "msg": 'i dont know'})
            });
        }}
    />
        </View>
    </ScrollView>

    </SafeAreaView>
    


    </View>
);
}

