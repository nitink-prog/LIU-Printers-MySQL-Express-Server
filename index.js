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
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "Welcome to the Homepage of the LIU Printers MySQL Express Server. Built by Nitin K. Please reach an endpoint."
  );
});

// Get Full Printers DB - Pagination?
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
    let sql = "UPDATE printers SET ?"; // UPDATE `printers` SET `dateUpdated` = NULL WHERE `printers`.`id` = 101;
    // TO-DO
    res.json(req.body);
    console.log(req.body);
  })
  // Insert a Printer
  .post((req, res) => {
    let id = req.params.id;
    let printer = {
      id,
      // TO-DO
    };
    let sql = "INSERT INTO printers SET ?"; // INSERT INTO `printers` (`id`, `building`, `date_updated`, `department`, `mac_address`, `model`, `name`, `room`, `serial`) VALUES ('100', 'unknown', '2022-04-20', '', '60:12:8B:D5:0E:5B', '4235', 'B-HS-604-1', 'unknown', 'RKJ18475');
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
