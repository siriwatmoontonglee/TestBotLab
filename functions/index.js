
const functions = require('firebase-functions');
const { event } = require('firebase-functions/v1/analytics');
const request = require('request-promise');

const LINE_MESSAGING_API = 'https://api.line.me/v2/bot/message';
const LINE_HEADER = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer FIpN7gZL4pCwwTC6/NqtUNNlxxm2wxg8G456P3x4HyEP8WCgFgTaX6bQWwuK45eIcQZeW30nsiVuddqLFSnqG6xaJkS/KxQ2QnOUt2utGDLxkz+CvixfY1gPFirN5ivy3RwsBlIvN0fcmw+7PyqpQwdB04t89/1O/w1cDnyilFU=`
};

exports.LineBot = functions.https.onRequest((req, res) => {
    if (req.body.events[0].message.type !== 'text') {
        return;
    }
    reply(req.body);
    console.log(req.body.events[0]);
});

const reply = (bodyResponse) => {
    return request({
        method: `POST`,
        uri: `${LINE_MESSAGING_API}/reply`,
        headers: LINE_HEADER,
        body: JSON.stringify({
            replyToken: bodyResponse.events[0].replyToken,
            messages: [
                {
                    type: `text`,
                    text: bodyResponse.events[0].message.text
                }
            ]
        })
    });
};