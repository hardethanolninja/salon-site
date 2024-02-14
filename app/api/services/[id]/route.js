import { getDb } from "@/backend/db";

//GET
export async function GET(req, res) {
  //get id from url
  const id = req.url.split("/").pop();

  const db = await getDb();

  //get selected item from services table
  const service = await db.all("SELECT * FROM Services WHERE id = ?", id);

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

  if (request.name) {
    await db.run(
      `UPDATE Services SET name = "${request.name}" WHERE id = ${id}`
    );
  }
  if (request.description) {
    await db.run(
      `UPDATE Services SET description = "${request.description}" WHERE id = ${id}`
    );
  }
  if (request.price) {
    await db.run(
      `UPDATE Services SET price = "${request.price}" WHERE id = ${id}`
    );
  }
  if (request.time) {
    await db.run(`UPDATE Services SET time = ${request.time} WHERE id = ${id}`);
  }
  if (request.image) {
    await db.run(
      `UPDATE Services SET image = "${request.image}" WHERE id = ${id}`
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

  db.run(`DELETE from Services WHERE id = ${id}`);

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
