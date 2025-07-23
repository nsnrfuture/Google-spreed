'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    countries: '',
    language: '',
  });
  const [status, setStatus] = useState('');

  const countries = [
    'Luxembourg',
    'Germany',
    'Austria',
    'Belgium',
    'United Kingdom',
    'Ireland',
    'Other Country',
  ];

  const languages = ['English', 'German', 'French', 'Spanish', 'Other'];

  const whatsappNumber = '918956248394';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Sending...');

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    
  };

  return (
    <div className="bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-black grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {/* Contact Info */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-[#fb5607]">Get in Touch</h1>
            <p className="text-gray-700 text-base leading-relaxed">
              Have questions about studying abroad, test prep, or applications? Reach out to us — we are happy to help!
            </p>
            <div className="space-y-4 text-sm text-gray-800">
              <div className="flex items-start gap-3"><MapPin className="text-[#5ce1e6] mt-1" /><span>Pune | Nashik</span></div>
              <div className="flex items-center gap-3"><Phone className="text-[#5ce1e6]" /><span>+91 8956248394</span></div>
              <div className="flex items-center gap-3"><Mail className="text-[#5ce1e6]" /><span>info@studysmart.co.in</span></div>
              <div className="flex items-center gap-3"><Mail className="text-[#5ce1e6]" /><span>House No-6, Indira Society, Kathe Lane Dwarka Nashik 422011</span></div>
              <div className="flex items-center gap-3"><Mail className="text-[#5ce1e6]" /><span>1, Ritesh Apartment, College Rd, near Kathiyawad Showroom, D'souza Colony, Nashik, Maharashtra 422005</span></div>
            </div>
            <div className="mt-8">
              <iframe
                src="https://www.google.com/maps/embed?pb=..."
                width="100%"
                height="300"
                allowFullScreen
                loading="lazy"
                className="rounded-xl border-2 border-[#5ce1e6] shadow-sm"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-[#fb5607]">Send Us a Message</h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" required className="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:ring-[#fb5607]" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required className="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:ring-[#fb5607]" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+918956248394" required className="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:ring-[#fb5607]" />
              <select name="countries" value={formData.countries} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:ring-[#fb5607]">
                <option value="">-- Choose a Country --</option>
                {countries.map((country, i) => <option key={i} value={country}>{country}</option>)}
              </select>
              <select name="language" value={formData.language} onChange={handleChange} required className="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:ring-[#fb5607]">
                <option value="">-- Choose a Language --</option>
                {languages.map((lang, i) => <option key={i} value={lang}>{lang}</option>)}
              </select>
              <textarea name="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Type your message..." required className="w-full border border-gray-300 px-4 py-2.5 rounded-md focus:ring-[#fb5607]"></textarea>
              <button type="submit" className="w-full bg-[#1d8233] text-white font-semibold px-6 py-3 rounded-md shadow-md">Submit</button>
              <p className="text-sm mt-2 text-gray-600">{status}</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;