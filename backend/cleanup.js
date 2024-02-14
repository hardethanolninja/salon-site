const sqlite3 = require("sqlite3").verbose();

let db = new sqlite3.Database(
  "../salon.sqlite",
  sqlite3.OPEN_READWRITE,
  (err) => {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log("Connected to the database.");
  }
);

//set table for cleanup
const tableName = "Services";
const columnName = "name";

const sql = `DELETE FROM ${tableName} WHERE ${columnName} IS NULL OR ${columnName} = ""`;

db.run(sql, function (err) {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log(`Rows deleted: ${this.changes}`);
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error(err.message);
    return;
  }
  console.log("Closed the database connection.");
});
