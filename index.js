var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
var app = express();

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// File upload route
app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("Uploaded file:", req.file); // Log full file object

  const { originalname, mimetype, size } = req.file;
  console.log({ originalname, mimetype, size }); // Log extracted fields

  return res.json({
    name: originalname,
    type: mimetype,
    size,
  });
});

const port = process.env.PORT || 3210;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
