const express = require('express');
const bodyparser = require('body-parser');
const { Expo } = require('expo-server-sdk');

let expo = new Expo();

const app = express();
const port = 80;

app.engine("html", require("ejs").renderFile);
app.use(bodyparser.json({ limit: '1mb' }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");

let clients = new Object;

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/register', async (req, res) => {
    const {expo_token} = req.body
    let token = generateToken();
    clients[token] = expo_token;
    console.log(clients);
    res.json({'app_token': token})
})

app.post('/registerToken', async (req, res) => {
    const {expo_token, app_token} = req.body
    clients[app_token] = expo_token;
    console.log(clients)
    res.json({'test': '123'})
})

app.get('/genToken', async(req, res) => {
    let token = generateToken();
    console.log(token)
    registered_tokens.push(token)
    res.send(token)
})

app.post('/sendMessage', async (req, res) => {
    const {app_token} = req.body;
    if(clients[app_token]){
        await sendMessages([clients[app_token]]);
        res.json({'status': 'ok'});
    } else res.send('token not found')
})

app.get('/send', async (req, res) => {
    sendMessages(expo_tokens);
    res.send('ok');
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

async function sendMessages(pushTokens){
    let messages = [];
    for (let pushToken of pushTokens) {
    // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

    // Check that all your push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
    }

    // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
    messages.push({
        to: pushToken,
        sound: 'default',
        body: 'This is a test notification',
        data: { withSome: 'data' },
    })
    }

    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
    // Send the chunks to the Expo push notification service. There are
    // different strategies you could use. A simple one is to send one chunk at a
    // time, which nicely spreads the load out over time:
    for (let chunk of chunks) {
        try {
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        // NOTE: If a ticket contains an error code in ticket.details.error, you
        // must handle it appropriately. The error codes are listed in the Expo
        // documentation:
        // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
        } catch (error) {
        console.error(error);
        }
    }
    })();
}

function generateToken(){
    let token = randString();
    while(clients[token]){ // keep generating tokens until token does not exist
        token = randString()
    }
    return token;
}

function randString(length=6){
    // const chars = "QWERTYUIOPASDFGHJKLZXCVBNM123456789";
    const chars = "QWERTYUIOPASDFGHJKLZXCVBNM";
    let res = '';
    for(let i = 0; i < length; i++){
        res += chars[Math.floor(Math.random()*chars.length)]
    }
    return res;
}
