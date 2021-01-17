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
let messages = new Object;
let keywords = new Object;
keywords['WNBEND'] = {'attendance': 0, 'bert': 0, 'marcus': 0}


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
    const {app_token, context} = req.body;
    conversationContext[app_token] = context;
    res.json({'status': 'ok'})
    // count words
    // words to count for
    let words = [];
    let count = new Object;
    words = Object.keys(keywords[app_token])
    words.forEach(word => {
        count[word] = 0
    })
    const countOccurrences = (arr, val) => arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
    
    context.forEach(text => {
        text = text[1].toLowerCase()
        for(let i = 0; i < text.length; i++){
            words.forEach(word => {
                if(i + word.length-1 < text.length && (text.substr(i, word.length) === word)){
                    console.log(text.substr(i, word.length))
                    count[word]++;
                }
            })
        }
    })
    words.forEach(word => {
        console.log(word, count[word], keywords[app_token][word])
        if(keywords[app_token][word] < count[word]){
            // send message
            sendMessages([clients[app_token]], `${word} was said.`)
            console.log(clients)
            console.log('word', word, 'was said')
            keywords[app_token][word] = count[word]
        }
    })

})

app.post('/context', (req, res) => {
    const {app_token} = req.body;
    console.log('request from', app_token)
    res.json({"context": conversationContext[app_token]});
})

app.post('/sendMessage', async (req, res) => {
    const {app_token, msg} = req.body;
    messages[app_token] = msg;
    res.send('ok');
})

app.post('/getMessage', (req, res) => {
    const {app_token} = req.body;
    if(messages[app_token]){
        res.json({"msg": messages[app_token]})
        delete messages[app_token]
    } else {
        res.json({'err': 'no msg found'})
    }
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

async function sendMessages(pushTokens, msg='Test Notif'){
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
        body: msg,
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
    return "WNBEND";
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
