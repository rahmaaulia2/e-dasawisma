const express = require("express");
const Controller = require("../controllers/controller");
const Authentication = require("../middlewares/authentication");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/login", Controller.login);
router.post("/addUser", Authentication, Controller.addUser);
router.get("/profile", Authentication, Controller.getProfile);
router.get("/user/:userId", Authentication, Controller.getUser);
router.patch("/updateUser/:userId", Authentication, Controller.updateUser);
router.delete("/deleteUser/:userId", Authentication, Controller.deleteUser);
router.post(
  "/addKK",
  upload.single("kartuKeluarga"),
  Authentication,
  Controller.addDetailKK
);
router.get("/KK/:idKK", Authentication, Controller.getDetailKK);
router.patch(
  "/KK/:idKK",
  upload.single("kartuKeluarga"),
  Authentication,
  Controller.updateDetailKK
);
router.delete("/KK/:idKK", Authentication, Controller.deleteKK);

module.exports = router;
