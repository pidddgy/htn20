const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hi');
})

app.get('register', (req, res) => {
    console.log('request');
    console.log(req.body.expo_token);
    res.send('ok')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})