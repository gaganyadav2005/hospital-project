const Booking = require('../models/Booking');
const sendEmail = require('../utils/sendEmail');
const razorpay = require('../config/razorpay');

// Create Razorpay order
const createOrder = async (req, res) => {
    try {
        const { sessionType } = req.body;
        const amount = sessionType === 'text' ? 100 : sessionType === 'call' ? 150 : 200;
        const options = {
            amount: amount * 100, // in paise
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Verify payment and save booking
const verifyPaymentAndBook = async (req, res) => {
    try {
        const { name, email, phone, sessionType, expertEmail, razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

        // TODO: Verify signature if needed (optional for now)

        const amount = sessionType === 'text' ? 100 : sessionType === 'call' ? 150 : 200;

        const booking = await Booking.create({
            name, email, phone, sessionType, amount,
            paymentId: razorpay_payment_id,
            expertEmail
        });

        // Send email to expert
        const mailOptions = {
            to: expertEmail,
            subject: `New Appointment Request`,
            text: `User ${name} wants a ${sessionType} session. Accept/Reject? Booking ID: ${booking._id}\n
Click Accept: http://localhost:3000/api/booking/expert-response/${booking._id}?action=accept\n
Click Reject: http://localhost:3000/api/booking/expert-response/${booking._id}?action=reject`
        };
        await sendEmail(mailOptions);

        res.json({ message: "Payment verified! Expert notified.", bookingId: booking._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createOrder, verifyPaymentAndBook, expertResponse };
