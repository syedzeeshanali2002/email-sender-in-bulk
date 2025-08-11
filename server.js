const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle email sending
app.post('/send-emails', async (req, res) => {
    const { emails, subject, message } = req.body;

    if (!emails || !subject || !message) {
        return res.status(400).send('Missing fields');
    }

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Your email
            pass: process.env.EMAIL_PASS  // Your app password
        }
    });

    try {
        for (const email of emails) {
            await transporter.sendMail({
                from: `"Bulk Mailer" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: subject,
                text: message
            });
        }
        res.send('Emails sent successfully!');
    } catch (error) {
        console.error('Error sending emails:', error);
        res.status(500).send('Failed to send emails');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
