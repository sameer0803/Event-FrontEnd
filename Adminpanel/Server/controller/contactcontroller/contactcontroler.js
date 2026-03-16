// const Contact = require("../../module/contactmodule/contactmodule");
// const nodemailer = require("nodemailer");
// const axios = require("axios");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const createContactMessage = async (req, res) => {
//   try {
//     // ✅ Frontend sends "name", so we destructure "name" (not "usernamee")
//     const { usernamee, email, phone, subject, message, captcha } = req.body;

//     // ✅ 1. Check required fields
//     if (!usernamee || !email || !phone || !subject || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // ✅ 2. Check captcha token presence
//     if (!captcha) {
//       return res.status(400).json({
//         success: false,
//         message: "Please complete reCAPTCHA verification.",
//       });
//     }

//     // ✅ 3. Verify reCAPTCHA with Google (before saving to DB)
//     const verificationResponse = await axios.post(
//       "https://www.google.com/recaptcha/api/siteverify",
//       null,
//       {
//         params: {
//           secret:
//             process.env.RECAPTCHA_SECRET_KEY ||
//             "6LfP7nEsAAAAAAQtIwfaaTZYscG5QDae558ts0Xo",
//           response: captcha,
//           remoteip: req.ip,
//         },
//       }
//     );

//     if (!verificationResponse.data.success) {
//       return res.status(400).json({
//         success: false,
//         message: "reCAPTCHA verification failed. Please try again.",
//       });
//     }

//     // ✅ 4. Save to MongoDB (only after captcha passes)
//     const contact = await Contact.create({
//       usernamee,   // make sure your Mongoose schema uses "name" (see note below)
//       email,
//       phone,
//       subject,
//       message,
//     });

//     // ✅ 5. Send notification email to admin
//     await transporter.sendMail({
//       from: `"Website Enquiry" <${process.env.EMAIL_USER}>`,
//       to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
//       subject: `New Contact Message: ${subject}`,
//       html: `
//         <h2 style="color:#c0392b;">New Contact Enquiry</h2>
//         <p><b>Name:</b> ${usernamee}</p>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phone}</p>
//         <p><b>Subject:</b> ${subject}</p>
//         <p><b>Message:</b><br/>${message}</p>
//       `,
//     });

//     // ✅ 6. Send confirmation email to the user
//     await transporter.sendMail({
//       from: `"ATLA Knots Solution" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: `We received your message — ${subject}`,
//       html: `
//         <h2 style="color:#c0392b;">Thank you, ${usernamee}!</h2>
//         <p>We have received your message and will get back to you within 1–2 business days.</p>
//         <hr/>
//         <p><b>Your message:</b><br/>${message}</p>
//         <br/>
//         <p style="color:#888;">ATLA Knots Solution | +91 78696 36070 | admin@atlaknots.com</p>
//       `,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Message sent successfully",
//       data: contact,
//     });
//   } catch (error) {
//     console.error("Contact Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//       error: error.message,
//     });
//   }
// };

// // Get all contact messages
// const getContactMessages = async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: contacts });
//   } catch (error) {
//     console.error("Error fetching contact messages:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// // Delete a contact message by ID
// const deleteContactMessage = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedContact = await Contact.findByIdAndDelete(id);
//     if (!deletedContact) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Contact message not found" });
//     }
//     res
//       .status(200)
//       .json({ success: true, message: "Contact message deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting contact message:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// };

// module.exports = {
//   createContactMessage,
//   getContactMessages,
//   deleteContactMessage,
// };

// const Contact = require("../../module/contactmodule/contactmodule");
// const nodemailer = require("nodemailer");
// const axios = require("axios");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // ← should be App Password if 2FA is on
//   },
// });

// // Optional: verify transporter once at startup (good practice)
// transporter.verify((error) => {
//   if (error) {
//     console.error("Email transporter error:", error);
//   } else {
//     console.log("Email transporter is ready");
//   }
// });

// const createContactMessage = async (req, res) => {
//   try {
//     // 1. Destructure – use field names that match frontend + schema
//     let { name, email, phone, subject, message, captcha } = req.body;

//     // 2. Basic sanitization & required check
//     name = (name || "").trim();
//     email = (email || "").trim().toLowerCase();
//     phone = (phone || "").trim();
//     subject = (subject || "").trim();
//     message = (message || "").trim();

//     if (!name || !email || !phone || !subject || !message) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     if (!captcha) {
//       return res.status(400).json({
//         success: false,
//         message: "Please complete reCAPTCHA verification",
//       });
//     }

//     // 3. Verify reCAPTCHA (secret MUST come from .env)
//     if (!process.env.RECAPTCHA_SECRET_KEY) {
//       console.error("RECAPTCHA_SECRET_KEY is not set in environment");
//       return res.status(500).json({
//         success: false,
//         message: "Server configuration error",
//       });
//     }

//     const verification = await axios.post(
//       "https://www.google.com/recaptcha/api/siteverify",
//       null,
//       {
//         params: {
//           secret: process.env.RECAPTCHA_SECRET_KEY,
//           response: captcha,
//           remoteip: req.ip,
//         },
//       }
//     );

//     if (!verification.data.success) {
//       return res.status(400).json({
//         success: false,
//         message: "reCAPTCHA verification failed. Please try again.",
//       });
//     }

//     // 4. Save to database (field names must match your schema!)
//     const contact = await Contact.create({
//       username: name,     // ← changed from usernamee
//       email,
//       phone,
//       subject,
//       message,
//     });

//     // 5. Prepare common email data
//     const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

//     // Admin notification
//     await transporter.sendMail({
//       from: `"Website Enquiry" <${process.env.EMAIL_USER}>`,
//       to: adminEmail,
//       subject: `New Enquiry: ${subject}`,
//       html: `
//         <h2 style="color:#c0392b;">New Contact Message</h2>
//         <p><strong>Name:</strong> ${name}</p>
//         <p><strong>Email:</strong> ${email}</p>
//         <p><strong>Phone:</strong> ${phone}</p>
//         <p><strong>Subject:</strong> ${subject}</p>
//         <p><strong>Message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
//         <hr>
//         <small>Received: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}</small>
//       `,
//     });

//     // User confirmation
//     await transporter.sendMail({
//       from: `"ATLA Knots Solution" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: `Thank You – We Received Your Message`,
//       html: `
//         <h2 style="color:#c0392b;">Hello ${name},</h2>
//         <p>Thank you for reaching out! We have received your message and will get back to you within 1–2 business days.</p>
//         <hr>
//         <p><strong>Your message:</strong><br>${message.replace(/\n/g, "<br>")}</p>
//         <br>
//         <p style="color:#555; font-size:0.9em;">
//           Best regards,<br>
//           Team ATLA Knots Solution<br>
//           📞 +91 78696 36070<br>
//           ✉️ admin@atlaknots.com
//         </p>
//       `,
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Message sent successfully",
//     });
//   } catch (error) {
//     console.error("Contact controller error:", error);

//     // More user-friendly error for timeout/network issues
//     if (axios.isAxiosError(error) && error.code === "ECONNABORTED") {
//       return res.status(503).json({
//         success: false,
//         message: "reCAPTCHA service is slow. Please try again later.",
//       });
//     }

//     return res.status(500).json({
//       success: false,
//       message: "Something went wrong. Please try again later.",
//     });
//   }
// };

const Contact = require("../../module/contactmodule/contactmodule.js"); // adjust path
const nodemailer = require("nodemailer");
const axios = require("axios");

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
    email = String(email || "")
      .trim()
      .toLowerCase();
    phone = String(phone || "").trim();
    subject = String(subject || "").trim();
    message = String(message || "").trim();

    // Required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, event type and message are required",
      });
    }

   

    // Save to DB
    await Contact.create({
      username: name,
      email,
      phone: phone || undefined, // optional
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
        <p><strong>Event Type:</strong> ${subject}</p>
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

    if (axios.isAxiosError(error)) {
      return res.status(503).json({
        success: false,
        message: "reCAPTCHA service unavailable. Please try again later.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

const getContactMessages = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }).lean(); // faster + plain JS objects

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
