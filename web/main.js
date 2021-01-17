/*

id is an integer that we repeatedly increment for unique ids

output is a map<int, block> (id: block)
each block is a map of id:subblock, also has a person property(string)

on mutation:
    for each block
        if this block does not have an id then assign it one, and add name
        for each subblock
            if this sub block does not have an id then assign it one

            update output[id of block][id of sub-block] with current value

since ids are increasing, it's easy to construct the chat logs in chronological order

*/

 //More Details https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 // select the target node
var target = document.querySelector('.a4cQT')
var ctx = []
var app_token = 'YYOTYQ';
let currentMark = -1;
 // console.log(target)
 // create an observer instance
var observer = new MutationObserver(function(mutations) {
 //   console.log(target.innerText);   
//    let txt = target.innerText;
   
    var children = target.children;
    for (var i = 0; i < children.length; i++) {
        if(!children[i].hasAttribute('mark')) {
            children[i].setAttribute('mark', ++currentMark);
        }
        let id = parseInt(children[i].getAttribute('mark'));

        let spl = children[i].innerText.split('\n');

        if(id > ctx.length) {
            ctx.push(spl);
        } else {
            ctx[id] = spl;
        }


        // console.log(children[i])
        // console.log(children[i].innerText);
    }
    sendContext ()
    console.log(ctx);
 });
 // configuration of the observer:
 var config = { attributes: true, childList: true, characterData: true, subtree:true };
 // pass in the target node, as well as the observer options
 observer.observe(target, config);

 function sendContext(){
    fetch(`https://api.osn-reo.org/sendContext`, {
        'method': 'POST',
        'headers': {
            'content-type': 'application/json'
        },
        'body': JSON.stringify({'app_token': app_token, "context": ctx})
    });
 }

 // document.getElementsByClassName('KHxj8b tL9Q4c')[0].setAttribute('data-initial-value', 'test');

// make sure the chat box is open before using this function
// for some reason it breaks when you send messages too fast, so dont
function sendMsg(message) {
    document.getElementsByClassName('KHxj8b tL9Q4c')[0].value = message
    document.getElementsByClassName('uArJ5e Y5FYJe cjq2Db IOMpW Cs0vCd RDPZE')[0].setAttribute('aria-disabled', false);
    var simulateClick = function (elem) {
        // Create our event (with options)
        var evt = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        // If cancelled, don't dispatch our event
        var canceled = !elem.dispatchEvent(evt);
    };
    
    // uArJ5e Y5FYJe cjq2Db IOMpW Cs0vCd M9Bg4d
    var button = document.getElementsByClassName('uArJ5e Y5FYJe cjq2Db IOMpW Cs0vCd')[0];
    console.log(button);
    simulateClick(button); 
}

async function getMessageToSend(){
    let resp = await fetch(`https://api.osn-reo.org/getMessage`, {
        'method': 'POST',
        'headers': {
            'content-type': 'application/json'
        },
        'body': JSON.stringify({'app_token': app_token})
    });
    resp = await resp.json();
    if(resp.msg){
        sendMsg(resp.msg);
    }
}

setInterval(getMessageToSend, 1000)