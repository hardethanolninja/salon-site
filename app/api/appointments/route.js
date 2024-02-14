import { getDb } from "@/backend/db";

//GET
export async function GET(req, res) {
  const db = await getDb();

  //get all items from appointments table
  const appointments = await db.all("SELECT * FROM Appointments");

  return new Response(JSON.stringify(appointments), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}

//POST
export async function POST(req, res) {
  const db = await getDb();

  //YYYY-MM-DD HH:MI:SS
  const { date_time, clientId, services, status, notes, duration } =
    await req.json();

  await db.run(
    `INSERT INTO Appointments (date_time, clientId, services, status, notes, duration) VALUES (?, ?, ?, ?, ?, ?)`,
    [date_time, clientId, services, status, notes, duration]
  );

  return new Response(
    JSON.stringify(
      {
        message: "successfully added appointment",
      },
      {
        headers: { "content-type": "application/json" },
        status: 200,
      }
    )
  );
}
