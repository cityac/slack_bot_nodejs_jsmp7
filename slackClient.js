let { RtmClient, CLIENT_EVENTS, RTM_EVENTS } = require('@slack/client');

var rtm;
let channel;

// The client will emit an RTM.AUTHENTICATED event on successful connection, with the `rtm.start` payload
handleAuth = function(rtmStartData) {
    for (const c of rtmStartData.channels) {
        if (c.is_member && c.name === 'node_bot') {
            channel = c.id
        }
    }
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}, but not yet connected to a channel`);
}

handleMessage = function(message) {
    console.log(message);
    if(message.channel.id === channel && message.text && message.text.includes("bot"))
        rtm.sendMessage("Your question is very important for us", message.channel, ()=> {
            rtm.sendMessage("Let me think.....");
        });
}

// you need to wait for the client to fully connect before you can send messages

connectionOpened = function () {
    rtm.sendMessage("Hello!", channel);
}

exports.init = () => {
    rtm = new RtmClient(process.env.SLACK_TOKEN);
    rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, handleAuth);
    rtm.on(RTM_EVENTS.MESSAGE, handleMessage);
    rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, connectionOpened);
    rtm.start();
}
