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

  const inputClass =
    'shadow border border-border-light rounded-btn w-full py-2 px-3 bg-surface text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent leading-tight';

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-center items-start gap-10">
      {/* Map + address */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-glow-sm rounded-[2rem] p-4 overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.1474968906233!2d77.6970654!3d14.3824489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb143981e543e85%3A0x53997b3890fe63d1!2sOPP%3A%20Kethireddy%20Colony%2C%20N%20S%20Gate%20Rd%2C%20Dharmavaram%2C%20Andhra%20Pradesh%20515671!5e0!3m2!1sen!2sin!4v1645721947194!5m2!1sen!2sin"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
            className="rounded-2xl"
          />
        </div>
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2rem] p-8 space-y-4">
          <h3 className="text-xl font-display font-bold text-accent uppercase tracking-widest">Our Address</h3>
          <p className="text-text-muted font-medium">NS.Gate Road, Dharmavaram, Anantapur (Dt), Andhra Pradesh</p>
          <div className="space-y-2 pt-4 border-t border-white/5">
            <p className="text-text-muted text-sm flex items-center gap-3">
              <span className="text-accent font-bold">Email:</span> kakatiyadmm@gmail.com
            </p>
            <p className="text-text-muted text-sm flex items-center gap-3">
              <span className="text-accent font-bold">Phone:</span> 9030088545
            </p>
            <p className="text-text-muted text-sm flex items-center gap-3">
              <span className="text-accent font-bold">Web:</span> www.kakatiyavidyaniketan.com
            </p>
          </div>
        </div>
      </div>

      {/* Contact form */}
      <div className="w-full lg:w-1/2">
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[2.5rem] p-8 sm:p-10 shadow-glow"
        >
          <div className="mb-10">
            <h2 className="text-3xl font-display font-black text-white tracking-tight">Get in Touch</h2>
            <div className="h-1 w-12 bg-accent mt-4" />
          </div>

          {[
            { label: 'Name', id: 'name', type: 'text', placeholder: 'Institutional Name' },
            { label: 'Contact Number', id: 'contact', type: 'tel', placeholder: 'WhatsApp or Mobile' },
            { label: 'Email Address', id: 'email', type: 'email', placeholder: 'Institutional Email' },
          ].map(({ label, id, type, placeholder }) => (
            <div key={id} className="mb-6">
              <label className="block text-xs font-black uppercase tracking-[0.2em] text-accent/80 mb-2" htmlFor={id}>
                {label}
              </label>
              <input
                className={inputClass}
                id={id}
                type={type}
                placeholder={placeholder}
                name={id}
                value={formData[id]}
                onChange={handleChange}
              />
            </div>
          ))}

          <div className="mb-8">
            <label className="block text-xs font-black uppercase tracking-[0.2em] text-accent/80 mb-2" htmlFor="message">
              Message
            </label>
            <textarea
              className={`${inputClass} h-32 resize-none`}
              id="message"
              placeholder="How can we assist you today?"
              name="message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accent hover:bg-white text-primary font-black uppercase tracking-widest py-5 rounded-xl transition-all duration-500 shadow-glow hover:shadow-glow-accent active:scale-95"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
