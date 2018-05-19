const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();

console.log(vapidKeys);

// {
// 	publicKey: 'BKmzm3addDa0_hQNkJ0Readn9V2-mIhtdNvfq_yOzYpY14hGhSGJ5ZD4flqSCBDEwlwxjiaLHparbg2n0h0gxOU',
// 	privateKey: 'ukWOx_ffTHeUXvN8ABM8qIxEgN4BHOB4pI7zU6e1yRM'
// }
