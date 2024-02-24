import { getDb } from "@/backend/db";

//GET
export async function GET(req, res) {
  const db = await getDb();

  try {
    // Get all items from appointments table and join with clients for client details
    const appointments = await db.all(
      `SELECT Appointments.*, Clients.firstName, Clients.lastName
     FROM Appointments
     INNER JOIN Clients ON Appointments.clientId = Clients.id`
    );

    // For each appointment, get associated services
    const appointmentsWithServices = await Promise.all(
      appointments.map(async (appointment) => {
        const services = await db.all(
          `SELECT Services.* 
       FROM AppointmentServices 
       INNER JOIN Services ON AppointmentServices.serviceId = Services.id 
       WHERE AppointmentServices.appointmentId = ?`,
          [appointment.id]
        );

        // Combine appointment info with its services
        return { ...appointment, services };
      })
    );

    return new Response(JSON.stringify(appointmentsWithServices), {
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

  const { date_time, clientId, services, status, notes, duration, price } =
    await req.json();

  try {
    // Start transaction
    await db.run("BEGIN TRANSACTION");

    const insertAppointment = `
      INSERT INTO Appointments (date_time, clientId, notes, duration, price)
      VALUES (?, ?, ?, ?, ?)
    `;
    const { lastID } = await db.run(insertAppointment, [
      date_time,
      clientId,
      notes,
      duration,
      price,
    ]);

    const insertAppointmentServices = `
      INSERT INTO AppointmentServices (appointmentId, serviceId)
      VALUES (?, ?)
    `;

    // Use Promise.all to wait for all insertions to complete
    await Promise.all(
      services.map((serviceId) =>
        db.run(insertAppointmentServices, [lastID, serviceId])
      )
    );

    // Commit transaction
    await db.run("COMMIT");
  } catch (err) {
    // Rollback in case of error
    await db.run("ROLLBACK");
    return new Response(
      JSON.stringify(
        {
          message: err.message,
        },
        {
          headers: { "content-type": "application/json" },
          status: 500,
        }
      )
    );
  }
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
