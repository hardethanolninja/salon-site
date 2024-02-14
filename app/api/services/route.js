import { getDb } from "@/backend/db";

//GET
export async function GET(req, res) {
  const db = await getDb();

  //get all items from services table
  const services = await db.all("SELECT * FROM Services");

  return new Response(JSON.stringify(services), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}

//POST
export async function POST(req, res) {
  const db = await getDb();

  const { name, description, price, time, image } = await req.json();

  await db.run(
    `INSERT INTO Services (name, description, price, time, image) VALUES (?, ?, ?, ?, ?)`,
    [name, description, price, time, image]
  );

  return new Response(
    JSON.stringify(
      {
        message: "successfully added service",
      },
      {
        headers: { "content-type": "application/json" },
        status: 200,
      }
    )
  );
}
