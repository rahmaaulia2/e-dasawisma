const express = require("express");
const Controller = require("../controllers/controller");
const Authentication = require("../middlewares/authentication");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  AuthorizationAdmin,
  AuthorizationRole,
  AuthorizationUser,
} = require("../middlewares/authorization");

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
router.post("/addUser", Authentication, AuthorizationAdmin, Controller.addUser);
router.get(
  "/profile",
  Authentication,
  AuthorizationRole,
  Controller.getProfile
); // get profile

router.get(
  "/users",
  Authentication,
  AuthorizationAdmin,
  Controller.getAllUsers
);
router.get(
  "/users/:userId",
  Authentication,
  AuthorizationAdmin,
  Controller.getUser
); // get user by id
router.patch(
  "/updateUser/:userId",
  Authentication,
  AuthorizationAdmin,
  Controller.updateUser
);
router.delete(
  "/deleteUser/:userId",
  Authentication,
  AuthorizationAdmin,
  Controller.deleteUser
);

router.post(
  "/addKK",
  upload.single("kartuKeluarga"),
  Authentication,
  AuthorizationUser,
  Controller.addKK
);
router.get("/KK", Authentication, AuthorizationRole, Controller.getAllKK);
router.get(
  "/KK/:idKK",
  Authentication,
  AuthorizationRole,
  Controller.getDetailKK
);
router.patch(
  "/KK/:idKK",
  upload.single("kartuKeluarga"),
  Authentication,
  AuthorizationRole,
  Controller.updateDetailKK
);
router.delete(
  "/KK/:idKK",
  Authentication,
  AuthorizationRole,
  Controller.deleteKK
);

module.exports = router;
