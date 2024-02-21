import { getDb } from "@/backend/db";

import { NextRequest, NextResponse } from "next/server";

GET;
export async function GET(req, res) {
  try {
    const db = await getDb();
    //get all items from clients table
    const clients = await db.all("SELECT * FROM Clients");

    return new Response(JSON.stringify(clients), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (err) {
    return new Response(null, {
      status: 500,
      message: `${err.message}`,
    });
  }
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
