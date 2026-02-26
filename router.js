const express = require('express');
const router = express.Router();
const { createOrder, verifyPaymentAndBook, expertResponse } = require('../controllers/bookingController');

router.post('/create-order', createOrder);          // Generate Razorpay order
router.post('/verify-booking', verifyPaymentAndBook); // After payment success
router.get('/expert-response/:id', expertResponse);   // Expert accept/reject

module.exports = router;
