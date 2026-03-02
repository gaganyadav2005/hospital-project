const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* ===== STATIC FRONTEND SERVE ===== */

// SERVE PUBLIC FOLDER (IMPORTANT)
app.use(express.static(path.join(__dirname, "public")));

/* ===== ROOT ROUTE ===== */

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* ===== ADMIN CONFIG ===== */

const ADMIN_EMAIL = "admin@psychotient.com";
const ADMIN_PASSWORD = "admin123";
const SECRET_KEY = process.env.SECRET_KEY || "supersecretkey";

/* ===== EMAIL CONFIG ===== */

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

/* ===== ADMIN LOGIN ===== */

app.post("/admin/login", (req, res) => {

    const { email, password } = req.body;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {

        const token = jwt.sign(
            { role: "admin" },
            SECRET_KEY,
            { expiresIn: "2h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token
        });

    } else {
        return res.status(401).json({
            message: "Invalid credentials"
        });
    }
});

/* ===== VERIFY ADMIN ===== */

function verifyAdmin(req, res, next) {

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        jwt.verify(token, SECRET_KEY);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
}

/* ===== MEMORY STORAGE ===== */

let appointments = [];

/* ===== BOOK APPOINTMENT ===== */

app.post("/appointment", async (req, res) => {

    const data = req.body;
    data.status = "Pending";
    appointments.push(data);

    try {

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            replyTo: data.email,
            subject: "New Appointment Booking",
            text: `
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Date: ${data.date}
Concern: ${data.concern}
Status: ${data.status}
`
        });

        res.json({ message: "Appointment Saved & Email Sent" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Email failed" });
    }
});

/* ===== GET APPOINTMENTS ===== */

app.get("/appointments", verifyAdmin, (req, res) => {
    res.json(appointments);
});

/* ===== UPDATE STATUS ===== */

app.put("/appointment/:index", verifyAdmin, async (req, res) => {

    const index = req.params.index;
    const { status } = req.body;

    if (!appointments[index]) {
        return res.status(404).json({ message: "Appointment not found" });
    }

    appointments[index].status = status;

    try {

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: appointments[index].email,
            subject: "Appointment Status Update",
            text: `
Hello ${appointments[index].name},

Your appointment status is now: ${status}
`
        });

        res.json({ message: "Status updated & email sent" });

    } catch (error) {
        res.status(500).json({ message: "Status updated but email failed" });
    }
});

/* ===== PORT FIX ===== */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});