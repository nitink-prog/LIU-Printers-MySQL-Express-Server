const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

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
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Homepage of the LIU Printers MySQL Express Server. Built by Nitin K. Please reach an endpoint."
  );
});

// Get Full Printers DB - Pagination?
app
  .route("/printers")
  .get((req, res) => {
    let sql = "SELECT * FROM printers";
    let query = db.query(sql, (err, results) => {
      if (err) throw err;
      console.log(results);
      res.send(results);
    });
  })
  // Insert a Printer
  .post((req, res) => {
    let printer = req.body;
    let sql =
      "INSERT INTO printers (id, building, date_updated, department, mac_address, model, name, room, serial) " +
      `VALUES (${printer.id}, '${printer.building}', '${printer.date_updated}', '${printer.department}', '${printer.mac_address}', '${printer.model}', '${printer.name}', '${printer.room}', '${printer.serial}')`;

    let query = db.query(sql, printer, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  });

app
  .route("/printers/:id")
  // Get a Printer
  .get((req, res) => {
    let id = req.params.id;
    let sql = `SELECT * FROM printers WHERE id = ${id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  })
  // Update a Printer
  .put((req, res) => {
    let id = req.params.id;
    let dept = req.body.department;
    let room = req.body.room;
    // let sql = `UPDATE printers SET ${stringrequest} WHERE printers.id = ${id}`;
    let sql = `UPDATE printers SET department = '${dept}', room = '${room}' WHERE printers.id = ${id}`;
    let query = db.query(sql, (err, result) => {
      if (err) throw err;
      console.log(result);
      // res.send(result);
    });

    res.json(req.body);
    console.log(sql);
  })
  // Delete a Printer
  .delete((req, res) => {
    let id = req.params.id;
    let sql = `DELETE FROM printers WHERE id = ${id}`;
    // DISABLED FOR NOW...
  });

// Listener
app.listen(portExpress, () => {
  console.log(`EXPRESS: Server running on port ${portExpress}`);
});
