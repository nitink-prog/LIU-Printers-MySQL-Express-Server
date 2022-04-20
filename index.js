const express = require("express");
const mysql = require("mysql2");

// ***** SQL ****** //
const database = "printers";
const db = mysql.createConnection({
  host: "192.168.64.3",
  port: "3306",
  user: "nitink",
  password: "admin",
  database,
});

// Connect
db.connect((err) => {
  if (err) throw err;
  console.log(`MYSQL: Connected to MySQL.`);
});

// ***** EXPRESS ***** //
const app = express();
const portExpress = "3008";

// Get Printers DB - Pagination?
app.get("/printers", (req, res) => {
  let sql = "SELECT * FROM printers";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

app
  .route("/printers/:id")
  // Get Individual Printer
  .get((req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM printers WHERE id = ${id}`;
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      console.log(results);
      res.send(results);
    });
  })
  // Update a Printer
  .put((req, res) => {
    let id = req.params.id;
    let sql = "UPDATE printers SET ?"; // UPDATE `printers` SET `dateUpdated` = NULL WHERE `printers`.`id` = 101;
    // TO-DO
  })
  // Insert a Printer
  .post((req, res) => {
    let id = req.params.id;
    let printer = { 
      id,
      // TO-DO
    };
    let sql = "INSERT INTO printers SET ?";
    let query = db.query(sql, printer, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });

// Delete a Printer

// Listener
app.listen(portExpress, () => {
  console.log(`EXPRESS: Server running on port ${portExpress}`);
});
