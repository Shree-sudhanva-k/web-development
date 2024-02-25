import {db} from '../index.js'

export const fetchAccountDetails = (req,res) =>{    
    db.query('select * from users where email = ?',[req.query.email], (err, result) => {
      if (err) {
        console.error("MySQL query error:", err);
        res.status(500).send("Error fetching data from database");
      } else {
        console.log(result);
        res.json(result);
      }
    });
  }

export const deleteAccount = (req,res) =>{
  const {email} = req.params;
  console.log(email);
  db.query('delete from users where email = ?',[email],(err, result) => {
    if (err) {
      console.error("MySQL query error:", err);
      res.status(500).send("Error fetching data from database");
    } else {
      console.log(result);
      res.status(200).send("Account Deleted successfully");
    }
  })
}