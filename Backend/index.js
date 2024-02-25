import express from "express";
import mysql from "mysql2";
import cors from "cors";
import authRouter from './Routes/auth.js'
import productRouter from './Routes/product.js';
import accountRouter from './Routes/account.js';
import cartRouter from './Routes/cart.js';
import cloudinary from 'cloudinary';

const app = express();

export const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "Shamanth24@",
  database: "test",
});

app.use(express.json());
app.use(cors());
app.use(authRouter);
app.use(productRouter);
app.use(accountRouter);
app.use(cartRouter);

cloudinary.config({
  cloud_name: 'dw1bfqu2k',
  api_key: '683727292253282',
  api_secret: 'GzN4mZnvAbb6DFmqtT9xcpW6zQ4'
});

app.listen(8800, () => {
    console.log("Connected backend");
  });
  