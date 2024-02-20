import { sortAppointments } from "./functions";

export function getAllAppointments(setState) {
  fetch("/api/appointments")
    .then((res) => res.json())
    .then((data) => {
      sortAppointments(data);
      setState(data);
    })
    .catch((err) => console.error(err));
}

export function getOneAppointment(setState, id) {
  fetch(`/api/appointments/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setState(data);
    })
    .catch((err) => console.error(err));
}

export function getAllClients(setState) {
  fetch("/api/clients")
    .then((res) => res.json())
    .then((data) => {
      setState(data);
    })
    .catch((err) => console.error(err));
}

export function getOneClient(setState, id) {
  fetch(`/api/clients/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setState(data);
    })
    .catch((err) => console.error(err));
}

export function getAllServices(setState) {
  fetch("/api/services")
    .then((res) => res.json())
    .then((data) => {
      setState(data);
    })
    .catch((err) => console.error(err));
}

export function getOneService(setState, id) {
  fetch(`/api/services/${id}`)
    .then((res) => res.json())
    .then((data) => {
      setState(data);
    })
    .catch((err) => console.error(err));
}
