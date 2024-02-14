import { getDb } from "@/backend/db";

//GET
export async function GET(req, res) {
  const regex = /clients\/\s*(\d+)\s*\/appointments/;

  const id = req.url.match(regex);

  const db = await getDb();

  //get selected item from services table
  const appointments = await db.all(
    "SELECT * FROM Appointments WHERE clientId = ?",
    id[1]
  );

  return new Response(JSON.stringify(appointments), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
}
