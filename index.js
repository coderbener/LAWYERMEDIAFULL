const express = require("express");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if not specified

app.use(cors());
app.use(express.json());

// ✅ Serve static files (for images, CSS, and JS)
app.use(express.static(path.join(__dirname, "docs")));  // Serve files from docs

// ✅ Serve index.html on root request
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "docs", "index.html"));
});

// ✅ Updated image paths (assuming images are inside "docs/")
const services = [
  { id: 1, name: "Civil Law", description: "Governs non-criminal interactions.", image: "/civil.jpg" },
  { id: 2, name: "Criminal Law", description: "Handles crime-related cases.", image: "/criminal.jpg" },
  { id: 3, name: "Tax Law", description: "Regulates taxation policies.", image: "/tax.jpeg" },
  { id: 4, name: "Consumer Law", description: "Protects consumers' rights.", image: "/consumer.jpg" },
  { id: 5, name: "Banking Law", description: "Covers banking regulations.", image: "/banking.jpg" },
  { id: 6, name: "Family Law", description: "Deals with family-related matters.", image: "/family.jpg" },
];

// Route to handle email sending
require("dotenv").config();

app.post("/send-email", async (req, res) => {
  console.log("Received request at /send-email");  // Debugging log
  console.log(req.body);  // Log request body

  const { firstname, lastname, email, districts, subject } = req.body;

  if (!firstname || !lastname || !email || !districts || !subject) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: "benhursanthosh81@gmail.com",
    to: "benhuratwork@gmail.com",
    subject: `New Contact Form Submission from ${firstname} ${lastname}`,
    text: `Name: ${firstname} ${lastname}\nEmail: ${email}\nDistrict: ${districts}\nMessage: ${subject}`,
    replyTo: email
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Failed to send email." });
  }
});



// ✅ Route to fetch services
app.get("/api/services", (req, res) => {
  res.json(services);
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
