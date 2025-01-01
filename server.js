import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import router from './routes/router.js';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'node:path';
import bodyParser from 'body-parser';
import session from 'express-session';
import { strict } from 'node:assert';

dotenv.config();
const port = process.env.PORT || 3000
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true })); 
app.use(morgan('dev'))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'love',
    saveUninitialized: false,
    resave: true,
    cookie:{
        maxAge:36000,
        sameSite: strict,
}}))
app.use(router);

app.listen( port , () =>{
    console.log(`serveur cree avec succes et tourne sur le port ${port}`);
});