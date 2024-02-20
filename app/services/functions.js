import { compareAsc } from "date-fns";

export function sortAppointments(appointments) {
  appointments.sort((a, b) =>
    compareAsc(new Date(a.date_time), new Date(b.date_time))
  );
}
