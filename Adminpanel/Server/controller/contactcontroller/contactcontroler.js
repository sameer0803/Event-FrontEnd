
const Contact = require("../../module/contactmodule/contactmodule.js"); // adjust path
const nodemailer = require("nodemailer");
const mongoose = require("mongoose"); // ← added this

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password if 2FA enabled
  },
});


transporter.verify((error) => {
  if (error) {
    console.error("Email transporter verification failed:", error);
  } else {
    console.log("Email transporter is ready");
  }
});

const createContactMessage = async (req, res) => {
  try {
    let { name, email, phone, subject, message } = req.body;

    // Clean inputs
    name = String(name || "").trim();
    email = String(email || "").trim().toLowerCase();
    phone = String(phone || "").trim();
    subject = String(subject || "").trim();
    message = String(message || "").trim();

    // Required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, subject and message are required",
      });
    }

    // Save to DB
    await Contact.create({
      username: name,
      email,
      phone: phone || undefined,
      subject,
      message,
    });

    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

    // Email to admin
    await transporter.sendMail({
      from: `"Website Enquiry" <${process.env.EMAIL_USER}>`,
      to: adminEmail,
      subject: `New Enquiry: ${subject}`,
      html: `
        <h2 style="color:#c0392b;">New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "—"}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
        <hr>
        <small>Received: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</small>
      `,
    });

    // Confirmation to user
    await transporter.sendMail({
      from: `"Grand Sameer Events" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank You – We Received Your Inquiry",
      html: `
        <h2 style="color:#c0392b;">Hello ${name},</h2>
        <p>Thank you for contacting us! We have received your inquiry and will get back to you within 1–2 business days.</p>
        <hr>
        <p><strong>Your message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
        <br>
        <p style="color:#555; font-size:0.9em;">
          Best regards,<br>
          Team Grand Sameer Events<br>
          📍 Ujjain, Madhya Pradesh<br>
          ✉️ info@grandsameerevents.com
        </p>
      `,
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean();

    return res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    return res.status(500).json({
      success: false,
      message: "Could not fetch messages",
    });
  }
};

const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid message ID",
      });
    }

    const deleted = await Contact.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Delete contact error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete message",
    });
  }
};

module.exports = {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
};