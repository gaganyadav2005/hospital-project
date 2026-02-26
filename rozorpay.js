const Razorpay = require('razorpay');

const instance = new Razorpay({
    key_id: 'YOUR_KEY_ID',         // replace with your Razorpay key
    key_secret: 'YOUR_KEY_SECRET'  // replace with your Razorpay secret
});

module.exports = instance;
