
import express from "express";
import multer from 'multer';
import path from 'path';
import {saveUser,allUser} from "../contollers/regis.js";

const router = express.Router();

router.get('/', async (req,res)=> {
     const data = await allUser();
     res.render('index',{data:data});
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/')
  },
   filename: (req, file, cb) => {
   cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({ storage: storage });

router.post('/reg',upload.single('profile'),saveUser,(req,res) =>{
     console.log(req.file.filename);
});

router.get('/registre',(req, res) =>{
     res.render('registre');
});

router.use((req,res, next)=>{
     res.status(404).render('404',{url: req.originalUrl});
});

export default router;
