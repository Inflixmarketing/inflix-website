import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import blogPortfolioRouter from './routes/blogPortfolio.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Allowed Origins for CORS
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.CLIENT_URL || 'https://inflixmarketing.in',
  'https://www.inflixmarketing.in'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all during development
    }
  },
  credentials: true
}));

app.use(express.json());

// Mount Blog and Portfolio API Routes
app.use('/api', blogPortfolioRouter);

// Content File Path for persistent storage
const contentFilePath = path.join(__dirname, 'data', 'content.json');

// Ensure data directory exists
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

// 1. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Inflix Marketing API Server',
    timestamp: new Date().toISOString()
  });
});

// 2. Contact Form Submission Endpoint
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, service, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required fields.' });
  }

  console.log(`[New Lead Received]: ${name} (${email}) - Service: ${service || 'General Inquiry'}`);

  // Optional: Send Email Notification via Nodemailer if SMTP is configured
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      await transporter.sendMail({
        from: `"Inflix Web Lead" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFICATION_EMAIL || process.env.SMTP_USER,
        subject: `🔥 New Lead from ${name} - Inflix Marketing`,
        html: `
          <h2>New Website Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Interested Service:</strong> ${service || 'General Inquiry'}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background: #f4f4f5; padding: 10px; border-left: 4px solid #6366f1;">
            ${message}
          </blockquote>
        `
      });
    } catch (emailErr) {
      console.error('Failed to send SMTP email:', emailErr.message);
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Thank you for reaching out! The Inflix team will contact you shortly.'
  });
});

// 3. Dynamic CMS Content API Endpoint (Get Content)
app.get('/api/content', (req, res) => {
  if (fs.existsSync(contentFilePath)) {
    try {
      const rawData = fs.readFileSync(contentFilePath, 'utf-8');
      return res.json(JSON.parse(rawData));
    } catch (err) {
      console.error('Error reading content file:', err);
    }
  }
  return res.json({ message: 'Default content in use.' });
});

// 4. Dynamic CMS Content API Endpoint (Save Content)
app.post('/api/content', (req, res) => {
  try {
    const updatedContent = req.body;
    fs.writeFileSync(contentFilePath, JSON.stringify(updatedContent, null, 2), 'utf-8');
    return res.json({ success: true, message: 'Website content updated successfully!' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save content update.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Inflix Backend API running on port ${PORT}`);
});
