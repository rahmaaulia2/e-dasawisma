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
  AuthorizationRT,
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
    console.log(file.originalname);
    
    cb(null, `${file.originalname}`);
  },
});

const upload = multer({ storage });

router.get("/test", (req, res) => {
  res.send("ini router test");
});
router.get("/roles", Controller.getAllRole); //get roles untuk semua role
router.post("/login", Controller.login); //login untuk semua role
router.post("/addUser", Authentication, AuthorizationAdmin, Controller.addUser); //add user hanya untuk admin
router.get(
  "/profile",
  Authentication,
  AuthorizationRole,
  Controller.getProfile
); // get profile untuk semua role

router.get(
  "/users",
  Authentication,
  AuthorizationAdmin,
  Controller.getAllUsers
); // get all users hanya untuk admin
router.get(
  "/users/:userId",
  Authentication,
  AuthorizationAdmin,
  Controller.getUserById
); // get user by id hanya untuk admin
router.patch(
  "/users/:userId",
  Authentication,
  AuthorizationAdmin,
  Controller.updateUser
); // update user hanya untuk admin
router.delete(
  "/users/:userId",
  Authentication,
  AuthorizationAdmin,
  Controller.deleteUser
); // delete user hanya untuk admin

router.post(
  "/addKK",
  upload.single("kartuKeluarga"),
  Authentication,
  AuthorizationRT,
  Controller.addKK
); // add KK hanya untuk user dan admin(kalo perlu)
router.get("/KK", Authentication, AuthorizationRole, Controller.getAllKK); // get all KK untuk semua role kecuali user
router.get(
  "/KK/:idKK",
  Authentication,
  AuthorizationRole,
  Controller.getDetailKK
); // get detail KK untuk semua role kecuali user
router.patch(
  "/KK/:idKK",
  upload.single("kartuKeluarga"),
  Authentication,
  AuthorizationRole,
  Controller.updateDetailKK
); // update detail KK untuk semua role kecuali user
router.delete(
  "/KK/:idKK",
  Authentication,
  AuthorizationRole,
  Controller.deleteKK
); // delete KK untuk semua role kecuali user
router.get(
  "/uploads/:filename",
  Authentication,
  AuthorizationRT,
  Controller.getUploads
);

module.exports = router;
