async function test_fetch(expo_token){
    const address = 'localhost:3000';
    fetch(`http://${address}/register`, {
        'method': 'POST',
        'headers': {
            'content-type': 'application/json'
        },
        'body': JSON.stringify({'expo_token': expo_token})
    }).then(res => res.json()).then(console.log);
}