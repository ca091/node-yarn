const webpush = require('web-push');

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

// This is the same output of calling JSON.stringify on a PushSubscription
const pushSubscription = {
	endpoint: '.....',
	keys: {
		auth: '.....',
		p256dh: '.....'
	}
};

webpush.sendNotification(pushSubscription, 'Your Push Payload Text');