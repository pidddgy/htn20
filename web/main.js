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

    console.log(ctx);
 });
 // configuration of the observer:
 var config = { attributes: true, childList: true, characterData: true, subtree:true };
 // pass in the target node, as well as the observer options
 observer.observe(target, config);
