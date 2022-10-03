var express = require("express");
let router = express.Router();
const Controller = require("./controller");
const verifyToken = require("./auth");
const multer = require("multer");

let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
}).single("user_photo");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/upload", verifyToken, upload, (req, res) => {
  res.send("file uploaded ");
});
router.get("/logout", verifyToken, Controller.logout);

module.exports = router;
