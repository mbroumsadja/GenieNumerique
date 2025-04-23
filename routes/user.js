import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import {
  become_admin,
  delete_member,
  login_member,
  recuperation_membre,
  signup_member,
  update_member,
  get_profile,
} from "../controllers/gn.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.js";
import { validate } from "../middlewares/validate.js";

const user = express.Router();

user.use(cors({
  origin: ['http://localhost:4000', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error("Seules les images JPEG/PNG sont autorisées"));
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

user.get("/gn/profile/update", authMiddleware, get_profile);
user.post("/gn/signup", authMiddleware, adminMiddleware, validate("signup"), signup_member);
user.post("/gn/login", validate("login"), login_member);
user.post("/gn/joinadmin", authMiddleware, adminMiddleware, validate("become_admin"), become_admin);
user.put("/gn/update/:id", authMiddleware, upload.single("photo"), validate("update"), update_member);
user.delete("/gn/delete/:id", authMiddleware, adminMiddleware, delete_member);
user.get("/gn/data", authMiddleware, recuperation_membre);

user.get("/", (req, res) => {
  res.render("./layouts/index");
});
user.get("/gn/signup", (req, res) => {
  res.render("./pages/signup");
});
user.get("/gn/login", (req, res) => {
  res.render("./pages/login");
});
user.get("/gn/profile", (req, res) => {
  res.render("./pages/profile");
});


export default user;