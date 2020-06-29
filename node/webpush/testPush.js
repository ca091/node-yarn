let webpush = require('web-push')
let path = require('path')
let fs = require('fs')
const vapidKeys = {
  publicKey: 'BKmzm3addDa0_hQNkJ0Readn9V2-mIhtdNvfq_yOzYpY14hGhSGJ5ZD4flqSCBDEwlwxjiaLHparbg2n0h0gxOU',
  privateKey: 'ukWOx_ffTHeUXvN8ABM8qIxEgN4BHOB4pI7zU6e1yRM',
}
const endpointOfChrome =
  'https://fcm.googleapis.com/fcm/send/diHtVet1zz8:APA91bF4NxUJfWrx8kvSVL4WAEHbIHCgOy6-KuTH9oOcx2o68NbJQqcY00XPuVGOTNFcplwUjwijWhEX4FhQCthzPVdut6xDYXy3EleZuGjrsLwO-7Gvts6dcybCC5jsJ3jstxWWDTHo'
const endpointOfFirefox =
  'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABa_7RDyNAcXmc3bEl7usZisz-BFCQ0TxUfISA3AhKmjjnCRFkQHjR7j-RehgIzHWiq-_TPVPnochSfDCKpSE7YQI5xQpTS2-rrgjEC9K2q--w0u0sFasf2JJHrKFLzwi1fg4NNSw88nKZ1e0h50_dpc5AF3ZjLCKEAbGhL1oE6FFMne5Y'

const auth = 'QdQw3LnOitj1Yvn3-mNj_g'
const p256dh = 'BIB1xcmWZcMdbZISQKCVHtxWSZy0hgDdhaxHSYsKNBrjASEH62IGQ8zsheiQ4ztcJpLXwL_RwzaT-hSSmUUcV18'

const pushMeg = {
  title: 'push title!',
  body: 'a test push msg.',
  tag: 'demo-notification',
}

let pushSubscriptionStr = fs.readFileSync(path.resolve(__dirname, './pushSubscription.txt'), 'utf-8')
let endpointArr = pushSubscriptionStr.split('\n')
endpointArr.pop()

// webpush.setGCMAPIKey('<Your GCM API Key Here>');
webpush.setVapidDetails(
  'mailto:erluzi001@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
)

function sendPush(pushSubscription, text) {
  webpush.sendNotification(pushSubscription, text)
    .then(data => console.log(data))
    .catch(error => {
      if (error.statusCode === 401) {
        // reset pushSubscription
        console.info('get push error')
        console.error(error)
      }
    })
}

for (let endpoint of endpointArr) {
  let pushSubscriptionObj = JSON.parse(endpoint)
  let pushSubscription = {
    endpoint: pushSubscriptionObj.endpoint,
    keys: {
      auth: pushSubscriptionObj.auth,
      p256dh: pushSubscriptionObj.p256dh,
    },
  }
  sendPush(pushSubscription, JSON.stringify(pushMeg))
}

module.exports = sendPush
