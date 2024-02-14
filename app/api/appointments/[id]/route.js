import { getDb } from "@/backend/db";

//GET
export async function GET(req, res) {
  //get id from url
  const id = req.url.split("/").pop();

  const db = await getDb();

  //get selected item from services table
  const appointment = await db.all(
    "SELECT * FROM Appointments WHERE id = ?",
    id
  );

  return new Response(JSON.stringify(appointment), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

//PATCH
export async function PATCH(req, res) {
  const db = await getDb();

  const id = req.url.split("/").pop();

  const request = await req.json();

  if (request.date_time) {
    await db.run(
      `UPDATE Appointments SET date_time = "${request.date_time}" WHERE id = ${id}`
    );
  }
  if (request.clientId) {
    await db.run(
      `UPDATE Appointments SET clientId = ${request.clientId} WHERE id = ${id}`
    );
  }
  if (request.services) {
    await db.run(
      `UPDATE Appointments SET services = "${request.services}" WHERE id = ${id}`
    );
  }
  if (request.status) {
    await db.run(
      `UPDATE Appointments SET status = "${request.status}" WHERE id = ${id}`
    );
  }
  if (request.notes) {
    await db.run(
      `UPDATE Appointments SET notes = "${request.notes}" WHERE id = ${id}`
    );
  }
  if (request.duration) {
    await db.run(
      `UPDATE Appointments SET duration = ${request.duration} WHERE id = ${id}`
    );
  }

  return new Response(
    JSON.stringify(
      {
        message: "successfully updated",
      },
      {
        headers: { "content-type": "application/json" },
        status: 200,
      }
    )
  );
}

//DELETE
export async function DELETE(req, res) {
  const db = await getDb();

  const id = req.url.split("/").pop();

  db.run(`DELETE from Appointments WHERE id = ${id}`);

  return new Response(
    JSON.stringify(
      {
        message: "successfully deleted",
      },
      {
        headers: { "content-type": "application/json" },
        status: 200,
      }
    )
  );
}
