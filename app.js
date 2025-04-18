const express = require("express");
const { db } = require("./model/index.js");
const { contact, blog } = db;
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

app.post("/createblog", upload.single("image1"), async (req, res) => {
  const {
    title,
    content,
    excerpt,
    categories,
    tags,
    slug,
    author,
    metaDescription,
  } = req.body;

  try {
    await blog.create({
      title,
      content,
      excerpt,
      image1: req.file.filename,
      categories: Array.isArray(categories) ? categories.join(",") : categories, // Convert categories to a comma-separated string if it's an array
      tags: Array.isArray(tags) ? tags.join(",") : tags, // Convert tags to a comma-separated string if it's an array

      slug,
      author,
      metaDescription,
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return res.status(500).send("Internal Server Error"); // Handle errors gracefully
  }
  res.redirect("/blog"); // Redirect to the blog page after creating a blog post
});

app.get("/createblog", (req, res) => {
  res.render("createBlog");
});

app.get("/blog", async (req, res) => {
  const data = await blog.findAll();
  res.render("blog", { blog: data });
});
app.get("/singleblog/:id", async (req, res) => {
  const { id } = req.params;

  const blogData = await blog.findAll({
    where: { id: id },
  });
  res.render("singleBlog", { blog: blogData });
});
app.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await blog.destroy({ where: { id: id } });
  res.redirect("/dashboard");
});

app.get("/dashboard", async (req, res) => {
  const data = await blog.findAll();

  res.render("dashboard", { art: data });
});

//edit blog
app.get("/editBlog/:id", async (req, res) => {
  const { id } = req.params;
  const data = await blog.findAll({ where: { id: id } });
  console.log(data);
  res.render("editBlog", { blog: data });
});
app.use(express.static("./storage/"));

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
