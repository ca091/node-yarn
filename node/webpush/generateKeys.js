const webpush = require('web-push');

// VAPID keys should only be generated only once.
const vapidKeys = webpush.generateVAPIDKeys();

console.log(vapidKeys);

// {
// 	publicKey: 'BEb2P46QjCQigSz8cpjj8I4s97tQrw-dxlh7MwUhdDQXEg-e11V7fzbye3xEysTcoDp2f6d-B-Q9QoEZdCOESPk',
// 	privateKey: 'w9i0F_e9EGAioxu1FEe75rRyR0EgN5TMVUe4RRVmzO8'
// }
