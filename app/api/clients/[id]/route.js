import { getDb } from "@/backend/db";

//GET
export async function GET(req, res) {
  //get id from url
  const id = req.url.split("/").pop();

  const db = await getDb();

  //get selected item from services table
  const service = await db.all("SELECT * FROM Clients WHERE id = ?", id);

  return new Response(JSON.stringify(service), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

//PATCH
export async function PATCH(req, res) {
  const db = await getDb();

  const id = req.url.split("/").pop();

  const request = await req.json();

  if (request.firstName) {
    await db.run(
      `UPDATE Clients SET firstName = "${request.firstName}" WHERE id = ${id}`
    );
  }
  if (request.lastName) {
    await db.run(
      `UPDATE Clients SET lastName = "${request.lastName}" WHERE id = ${id}`
    );
  }
  if (request.email) {
    await db.run(
      `UPDATE Clients SET email = "${request.email}" WHERE id = ${id}`
    );
  }
  if (request.phone) {
    await db.run(
      `UPDATE Clients SET phone = ${request.phone} WHERE id = ${id}`
    );
  }
  if (request.notes) {
    await db.run(
      `UPDATE Clients SET notes = "${request.notes}" WHERE id = ${id}`
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

  db.run(`DELETE from Clients WHERE id = ${id}`);

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
