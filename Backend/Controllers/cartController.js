import { db } from "../index.js";

export const addItem = (req, res) => {
  const values = [
    req.body.email,
    req.body.productName,
    req.body.quantity,
    req.body.price,
  ];
  db.query(
    "insert into carts(email,productName,quantity,price) values(?)",
    [values],
    (err, result) => {
      if (err) {
        console.error("MySQL query error:", err);
        res.status(500).send("Error fetching data from database");
      } else {
        console.log(result);
        res.json(result);
      }
    }
  );
};

export const cartItemsDisplay = (req,res) =>{  
    db.query('select * from carts where email = ?',[req.query.email], (err, result) => {
      if (err) {
        console.error("MySQL query error:", err);
        res.status(500).send("Error fetching data from database");
      } else {
        console.log(result);
        res.json(result);
      }
    });
  }
