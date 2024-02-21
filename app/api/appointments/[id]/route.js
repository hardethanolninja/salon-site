import { getDb } from "@/backend/db";

//GET
export async function GET(req, res) {
  const db = await getDb();

  const id = req.url.split("/").pop();

  try {
    // Get all items from appointments table and join with clients for client details
    const appointments = await db.all(
      `SELECT Appointments.*, Clients.firstName, Clients.lastName
     FROM Appointments
     INNER JOIN Clients ON Appointments.clientId = Clients.id
     WHERE Appointments.id = ?`,
      id
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

//PATCH
export async function PATCH(req, res) {
  const db = await getDb();

  const id = req.url.split("/").pop();

  const request = await req.json();

  try {
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
    if (request.price) {
      await db.run(
        `UPDATE Appointments SET price = ${request.price} WHERE id = ${id}`
      );
    }

    if (request.services) {
      services.forEach((serviceId) => {
        db.run(
          "INSERT INTO AppointmentServices (appointmentId, serviceId) VALUES (?, ?)",
          [id, serviceId]
        );
      });
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
  } catch (err) {
    return new Response(null, {
      status: 500,
      message: `${err.message}`,
    });
  }
}

//DELETE
export async function DELETE(req, res) {
  const db = await getDb();

  const id = req.url.split("/").pop();

  try {
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
  } catch (err) {
    return new Response(null, {
      status: 500,
      message: `${err}`,
    });
  }
}
