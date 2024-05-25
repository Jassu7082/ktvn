import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-[#081F37] py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-white text-center">Contact Us</h1>
        <div className="flex flex-wrap justify-center items-start">
          <div className="w-full lg:w-1/2 px-4 sm:px-10 mb-8">
            <div className="bg-white shadow-md rounded p-4">
              {/* Embedded Google Map */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.1474968906233!2d77.6970654!3d14.3824489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb143981e543e85%3A0x53997b3890fe63d1!2sOPP%3A%20Kethireddy%20Colony%2C%20N%20S%20Gate%20Rd%2C%20Dharmavaram%2C%20Andhra%20Pradesh%20515671!5e0!3m2!1sen!2sin!4v1645721947194!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Google Map"
              ></iframe>
            </div>
            <div className="bg-white shadow-md rounded p-4 mt-4">
              <h3 className="text-lg font-semibold mb-2">Our Address</h3>
              <p>NS.Gate Road, Dharmavaram, Anantapur (Dt), Andhra Pradesh</p>
              <p>Email: kakatiyadmm@gmail.com</p>
              <p>Phone: 9030944717, 9030088545</p>
              <p>Website: www.kakatiyavidyaniketan.com</p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 px-4 m-auto">
            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-[#081F37] text-white border border-white rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="contact">
                  Contact Number
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  id="contact"
                  type="tel"
                  placeholder="Contact Number"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label className="block  text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3  leading-tight focus:outline-none focus:shadow-outline h-40"
                  id="message"
                  placeholder="Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
