import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import user from './routes/user.js';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'node:path';
import bodyParser from 'body-parser';
import session from 'express-session';
import cookieParser from 'cookie-parser';

dotenv.config();
const port = process.env.PORT || 3000
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan('dev'))
app.use("/uploads", express.static("uploads"));

app.use(session({
    secret:'love',
    saveUninitialized: false,
    resave: true,}))
app.use(user)

app.use((req, res, next) => {
    res.status(404).render('404');
  });
  
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500');
  });

app.listen( port , () =>{
    console.log(`serveur cree avec succes et tourne sur le port ${port}`);
});