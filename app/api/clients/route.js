import { getDb } from "@/backend/db";

//GET
export async function GET(req, res) {
  const db = await getDb();

  //get all items from services table
  const clients = await db.all("SELECT * FROM Clients");

  return new Response(JSON.stringify(clients), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}

//POST
export async function POST(req, res) {
  const db = await getDb();

  const { firstName, lastName, email, phone, notes } = await req.json();

  await db.run(
    `INSERT INTO Clients (firstName, lastName, email, phone, notes) VALUES (?, ?, ?, ?, ?)`,
    [firstName, lastName, email, phone, notes]
  );

  return new Response(
    JSON.stringify(
      {
        message: "successfully added client",
      },
      {
        headers: { "content-type": "application/json" },
        status: 200,
      }
    )
  );
}
