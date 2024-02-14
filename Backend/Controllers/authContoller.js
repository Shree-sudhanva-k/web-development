import { db } from "../index.js";

export const signup = (req, res) => {
  const values = [req.body.name, req.body.email, req.body.password];
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [values[1]],
    (selectErr, selectResults) => {
      if (selectErr) {
        console.error("Error checking user existence:", selectErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // If a user with the given email already exists, return an error
      if (selectResults.length > 0) {
        return res
          .status(400)
          .json({ error: "User with this email already exists" });
      }
      db.query("insert into users values(?)", [values], (err, data) => {
        if (err) return res.json(err);
        console.log("Successful");
        return res.json(data);
      });
    }
  );
};

export const login = (req, res) => {
  const values = [req.body.email, req.body.password];
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [values[0]],
    (selectErr, selectResults) => {
      if (selectErr) {
        console.log(selectErr)
        console.error("Error checking user existence:", selectErr);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // If a user with the given email already exists, return an error
      if (selectResults.length == 0) {
        console.log('doesnotexists');
        return res
          .status(400)
          .json({ error: "User with this email doesnot exists" });
      }

      const user = selectResults[0];

      if (values[1] != user.password) {
        console.log('incorrectpass')
        return res.status(401).json({ error: "Incorrect password" });
      }
      return res
        .status(200)
        .json({ success: true, user: { name: user.name, email: user.email } });
    }
  );
};
