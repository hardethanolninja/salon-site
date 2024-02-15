const sqlite3 = require("sqlite3").verbose();

//connect to or create new SQLite database
const db = new sqlite3.Database(
  "./salon.sqlite",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to SQLite DB");
  }
);

//ensure database queries are executed sequentially
db.serialize(() => {
  //create services table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS Services (
      id INTEGER PRIMARY KEY,
      name TEXT,
      description TEXT,
      price TEXT,
      time INT,
      image TEXT
    )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created services table.");

      //clear out the services table
      db.run(`DELETE FROM Services`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from services");

        const services = [
          [
            "Partial Highlight",
            "Depends on length and density. What you get is a full face frame foil, and back foils. This also give you one of the most full coverage of blonde or desired color.",
            "Varies",
            150,
            "/placeholder.jpg",
          ],
          [
            "Partial Balayage",
            "Depend on Length and density. What you get is a very lived in look, that is low maintenance. Where I leave your natural hair as a lowlight in between. And can get 3-6 month grow out with proper maintenance.",
            "Varies",
            150,
            "/placeholder.jpg",
          ],
          [
            "Color Retouch",
            "Simple color retouch",
            "105",
            150,
            "/placeholder.jpg",
          ],
        ];

        const insertSql = `INSERT INTO Services(name, description, price, time, image) VALUES (?, ?, ?, ?, ?)`;

        services.forEach((service) => {
          db.run(insertSql, service, function (err) {
            if (err) {
              return console.error(err.message);
            }
            const id = this.lastID;
            console.log(`Rows inserted, ID ${id}`);
          });
        });
      });
    }
  );

  //create client table if it doesn't exist
  db.run(
    `CREATE TABLE IF NOT EXISTS Clients (
      id INTEGER PRIMARY KEY,
      firstName TEXT,
      lastName TEXT,
      email TEXT,
      phone INT,
      notes TEXT,
      status TEXT
    )`,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created clients table.");

      //clear out the services table
      db.run(`DELETE FROM Clients`, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log("All rows deleted from clients");

        //create appointments table if it doesn't exist
        db.run(
          `CREATE TABLE IF NOT EXISTS Appointments (
        id INTEGER PRIMARY KEY,
        date_time DATETIME,
        clientId INTEGER,
        services TEXT,
        status TEXT,
        notes TEXT,
        duration INT,
        price INT,
        FOREIGN KEY (clientId) REFERENCES Clients(id)
      )`,
          (err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log("Created appointments table.");

            //clear out the services table
            db.run(`DELETE FROM Appointments`, (err) => {
              if (err) {
                return console.error(err.message);
              }
              console.log("All rows deleted from appointments");
            });
          }
        );

        db.close((err) => {
          if (err) {
            console.error(err.message);
          }
          console.log("Closed DB connection");
        });
      });
    }
  );
});
