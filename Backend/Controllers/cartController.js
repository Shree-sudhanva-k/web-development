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

export const cartItemsDisplay = (req, res) => {
  db.query(
    "select * from carts where email = ?",
    [req.query.email],
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

export const placeOrder = (req, res) => {
  const { email,totalPrice } = req.body;
  db.query(
    "insert into orders(user_email,total_amount) values(?,?)",
    [email, totalPrice],
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

export const orderItems = (req,res) => {
  const { email,items ,totalPrice } = req.body;
  db.query(
    "select order_id from orders where user_email = ?",
    [email],
    (err, result1) => {
      if (err) {
        console.error("MySQL query error:", err);
        res.status(500).send("Error fetching data from database1");
      } else {        
        items.forEach((item) => {
          db.query(
            "insert into order_items(order_id,product_name,quantity,price,totalPrice) values(?,?,?,?,?)",
            [result1[0].order_id,item.productName,item.quantity,item.price,totalPrice],
            (err, result2) => {
              if (err) {
                console.error("MySQL query error:", err);
                res.status(500).send("Error fetching data from database2");
              } else {
                console.log(result2);                             
              }
            }
          );
        });
        res.json(result1);
      }
    }
  );
}

export const deleteCart = (req,res) =>{
  const { email } = req.body;
  db.query(
    "delete from carts where email = ?",
    [email],
    (err, result) => {
      if (err) {
        console.error("MySQL query error:", err);
        res.status(500).send("Error fetching data from database3");
      } else {
        console.log(result);
        res.json(result);
      }
    }
  );
}

export const incrementQuantity = (req,res) => {
  const {email,productName} = req.body;
  db.query(
    "update carts set quantity = quantity + 1 where email = ? and productName = ?",
    [email,productName],
    (err, result) => {
      if (err) {
        console.error("MySQL query error:", err);
        res.status(500).send("Error fetching data from database3");
      } else {
        console.log(result);
        res.json(result);
      }
    }
  );
}

export const decrementQuantity = (req,res) => {
  const {email,productName} = req.body;
  db.query(
    "update carts set quantity = quantity - 1 where email = ? and productName = ?",
    [email,productName],
    (err, result) => {
      if (err) {
        console.error("MySQL query error:", err);
        res.status(500).send("Error fetching data from database3");
      } else {
        console.log(result);
        res.json(result);
      }
    }
  );
}

export const deleteItem = (req,res) =>{
  const { email , productName} = req.body;
  db.query(
    "delete from carts where email = ? and productName = ?",
    [email,productName],
    (err, result) => {
      if (err) {
        console.error("MySQL query error:", err);
        res.status(500).send("Error fetching data from database3");
      } else {
        console.log(result);
        res.json(result);
      }
    }
  );
}