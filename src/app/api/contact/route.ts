import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import axios from 'axios';

export async function POST(req: Request) {
  const { name, email, phone, message, countries, language } = await req.json();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Study Abroad Inquiry from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone}
Country of Interest: ${countries}
Preferred Language: ${language}

Message:
${message}
      `,
    });

    // ✅ Send to Google Sheets via Apps Script
    const googleScriptUrl = process.env.GOOGLE_SCRIPT_URL;
    try {
      await axios.post(googleScriptUrl!, {
        name,
        email,
        phone,
        countries,
        language,
        message,
      });
      console.log('Data sent to Google Sheet ✅');
    } catch (sheetError) {
      console.error('Google Sheet Error:', sheetError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email Error:', error);
    return NextResponse.json({ success: false, error });
  }
}