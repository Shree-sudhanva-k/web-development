import {db} from '../index.js'

export const productInput = (req, res) => {
  const { name, description, category, price, stock_quantity, weight,photo,email } =
    req.body;

  db.query(
    "insert into products (name, description, category, price, stock_quantity, weight,photo,email) values(?,?,?,?,?,?,?,?)",
    [name, description, category, price, stock_quantity, weight,photo,email],
    (err, data) => {
      if (err) return res.json(err);
      console.log("Successful");
      return res.json(data);
    }
  );
};

export const productDisplay = (req,res) =>{  
  db.query('select * from products where category = ?',[req.query.category], (err, result) => {
    if (err) {
      console.error("MySQL query error:", err);
      res.status(500).send("Error fetching data from database");
    } else {
      console.log(result);
      res.json(result);
    }
  });
}

export const productDetailsDisplay = (req,res) =>{  
  db.query('select * from products where name = ?',[req.query.itemName], (err, result) => {
    if (err) {
      console.error("MySQL query error:", err);
      res.status(500).send("Error fetching data from database");
    } else {
      console.log(result);
      res.json(result);
    }
  });
}

export const searchDisplay = (req,res) =>{  
  
  db.query('select * from products where name = ? or category = ?',[req.query.text,req.query.text], (err, result) => {
    if (err) {
      console.error("MySQL query error:", err);
      res.status(500).send("Error fetching data from database");
    } else {
      console.log(result);
      res.json(result);
    }
  });
}

