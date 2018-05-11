let webpush = require('web-push');
const vapidKeys = {
    publicKey: 'BEb2P46QjCQigSz8cpjj8I4s97tQrw-dxlh7MwUhdDQXEg-e11V7fzbye3xEysTcoDp2f6d-B-Q9QoEZdCOESPk',
    privateKey: 'w9i0F_e9EGAioxu1FEe75rRyR0EgN5TMVUe4RRVmzO8'
};

// webpush.setGCMAPIKey('<Your GCM API Key Here>');
webpush.setVapidDetails(
    'mailto:erluzi001@gmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const pushSubscription = {
    endpoint: 'https://fcm.googleapis.com/fcm/send/diHtVet1zz8:APA91bF4NxUJfWrx8kvSVL4WAEHbIHCgOy6-KuTH9oOcx2o68NbJQqcY00XPuVGOTNFcplwUjwijWhEX4FhQCthzPVdut6xDYXy3EleZuGjrsLwO-7Gvts6dcybCC5jsJ3jstxWWDTHo',
    keys: {
        auth: 'aGdWS4znEEcDcBDi1CoRXw',
        p256dh: 'BCokvlY27nAH9a9AXEHyywvYB4RDdnvy6BXq1kO5ELsjbNHzbFzUgLB_jEys2Hd20eQCBlJfBNDUlaFwOYRrVfg',
    }
};

webpush.sendNotification(pushSubscription, 'Your Push Payload Text')
    .then(data => console.log(data))
    .catch(error => {
        if(error.statusCode === 401){
            // reset pushSubscription
            console.log(error)
        }
    });

function sendPush(pushSubscription, text) {
    webpush.sendNotification(pushSubscription, text)
        .then(data => console.log(data))
        .catch(error => {
            if(error.statusCode === 401){
                // reset pushSubscription
                console.log(error)
            }
        });
}

module.exports = sendPush;