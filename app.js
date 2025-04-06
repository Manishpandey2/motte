const express = require("express");
const { db } = require("./model/index.js");
const contact = db.contact;
const app = express();

require("./model/index.js"); // Initialize the database connection
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
app.use(express.json()); // Middleware to parse JSON data
const { multer, storage } = require("./middleware/multerConfig.js"); // Import multer configuration

const upload = multer({ storage: storage }); // Initialize multer with the storage configuration

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/contact", (req, res) => {
  res.render("contactForm");
});

app.post("/contact", upload.single("image"), async (req, res) => {
  // Log the request body to the console
  const { name, email, message, phone, subject } = req.body;
  // Log the uploaded file information
  await contact.create({
    name,
    email,
    message,
    phone,
    subject,
    image: req.file.filename,
  });

  res.redirect("/formdata"); // Log the form data to the console
});

app.get("/formdata", async (req, res) => {
  const data = await contact.findAll();
  // Fetch all form data from the database
  res.render("formData", { contact: data }); // Render the formData view with the fetched data
});

app.get("/createblog", (req, res) => {
  res.render("createBlog");
});

app.use(express.static("./storage/"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
