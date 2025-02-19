const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if not specified

app.use(cors());
app.use(express.json());

// Serve static files (for images)
app.use(express.static(path.join(__dirname, "public")));

const services = [
  { id: 1, name: "Civil Law", description: "Governs non-criminal interactions.", image: "civil.jpg" },
  { id: 2, name: "Criminal Law", description: "Handles crime-related cases.", image: "criminal.jpg" },
  { id: 3, name: "Tax Law", description: "Regulates taxation policies.", image: "tax.jpeg" },
  { id: 4, name: "Consumer Law", description: "Protects consumers' rights.", image: "consumer.jpg" },
  { id: 5, name: "Banking Law", description: "Covers banking regulations.", image: "banking.jpg" },
  { id: 6, name: "Family Law", description: "Deals with family-related matters.", image: "family.jpg" }
];

// Route to fetch services
app.get("/api/services", (req, res) => {
  res.json(services);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
