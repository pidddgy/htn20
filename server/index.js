const express = require('express');
const bodyparser = require('body-parser');
const http = require('http');
const cors = require('cors');
const https = require('https');
const fs = require('fs');
const { Expo } = require('expo-server-sdk');

let expo = new Expo();

const app = express();
const port = 80;

const privKey = fs.readFileSync('public/ssl-cert/private.key', 'utf8');
const certificate = fs.readFileSync('public/ssl-cert/certificate.crt', 'utf8');
const ca = fs.readFileSync('public/ssl-cert/ca_bundle.crt', 'utf8');

const creds = {
    key: privKey,
    cert: certificate,
    ca: ca
};

app.engine("html", require("ejs").renderFile);
app.use(cors());
app.use(bodyparser.json({ limit: '1mb' }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set("view engine", "ejs");

let clients = new Object;
let conversationContext = new Object;

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

app.post('/sendContext', async(req, res) => {
    console.log(req.body);
    // const {app_token, context} = req.body;
    // console.log(app_token, context);
    // conversationContext[app_token] = context;
    res.json({'status': 'ok'})
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

const httpServer = http.createServer(app);
const httpsServer = https.createServer(creds, app);

// httpServer.listen(80, () => {
//     console.log("HTTP Server up")
// })

httpsServer.listen(443, () => {
    console.log("HTTPS Server up")
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
