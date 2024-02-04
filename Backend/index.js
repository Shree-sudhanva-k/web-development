import express from "express";
import mysql from "mysql2";
import cors from "cors";
import authRouter from './Routes/auth.js'

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

app.listen(8800, () => {
    console.log("Connected backend");
  });
  