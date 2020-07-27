'use strict';

import utility from './utility';
import skywayHelper from './skywayHelper';

const skywayOptions = {
    APIKEY: '347195cf-26f8-4ed1-8090-6d21fe02d108',
    mode: 'sfu',
    roomName: 'abc'
}

const skyway = new skywayHelper(skywayOptions);
let remoteStream = null;
const startStreaming = document.getElementById('start_streaming');

skyway.joinMediaRoom().then(result =>{
    if(result.type === 'stream'){
        remoteStream = result.value;
    }
}).then(() =>{
    setInterval(() => {
        utility.countViewers(skyway.getSkyWayInstance()).then(result =>{
            utility.setViewersCount(result);
        });
    },2000);
});

startStreaming.addEventListener('click' , ()=>{
    utility.playMediaStream(document.getElementById('remote'),remoteStream);
    utility.setHostStats(true);
    utility.countViewers(skyway.getSkyWayInstance()).then(result =>{
        utility.setViewersCount(result);
    })
});
