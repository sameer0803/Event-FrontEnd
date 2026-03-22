import React, { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./ContactForm.css";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });
 

  // Animate on load / scroll into view
  useEffect(() => {
    const els = document.querySelectorAll(".animate-on-load");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trimStart() }));
    if (status.message) setStatus({ type: "", message: "" });
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.eventType ||
      !formData.message
    ) {
      setStatus({ type: "error", message: "Please fill all required fields." });
      return;
    }

   

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const payload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.eventType, // ← matches backend
        message: formData.message.trim()
      };

      const response = await fetch("https://api.grandsameerevents.com/api/contact/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          message: "",
        });
       
      } else {
        setStatus({
          type: "error",
          message:
            result.message || "Failed to send message. Please try again.",
        });
      }
    } catch (err) {
      console.error("Form submission error:", err);
      setStatus({
        type: "error",
        message: "Network error. Please check your internet connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Left side - Info */}
        <div className="contact-info animate-on-load">
          <h2>Contact Us</h2>
          <p className="contact-desc">
            Questions? Need a custom event solution? Reach out now.
          </p>

          <div className="contact-details">
            <div className="detail-item">
              <span className="icon">📍</span>
              <div>
                <h3>Address</h3>
                <p>Ujjain HQ, Madhya Pradesh</p>
              </div>
            </div>

            <div className="detail-item">
              <span className="icon">📞</span>
              <div>
                <h3>Phone</h3>
                <p>
                  <a href="tel:+919630466070">+91 9630466070</a>
                </p>
              </div>
            </div>

            <div className="detail-item">
              <span className="icon">📧</span>
              <div>
                <h3>Email</h3>
                <p>
                  <a href="mailto:info@grandsameerevents.com">
                    info@grandsameerevents.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="map-container">
            <iframe
              title="Ujjain Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14693.34653183479!2d75.7754056!3d23.1765238!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3963742e4e77ab0b%3A0x5dcf5f0e8283d5e!2sUjjain%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1701500000000!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="contact-form animate-on-load">
          <h2>Inquiry Form</h2>

          {status.message && (
            <div className={`status-message ${status.type}`}>
              {status.type === "success" ? "✓ " : "⚠ "}
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="name">Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="form-group">
              <label htmlFor="eventType">Event Type *</label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              >
                <option value="">Select event type</option>
                <option value="CorporateEvent">Corporate Event</option>
                <option value="Wedding">Wedding</option>
                <option value="Exhibition">Exhibition</option>
                <option value="Conference">Conference</option>
                <option value="Political/Govt">Political / Govt</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your requirements..."
                rows={4}
                required
              />
            </div>

         

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
