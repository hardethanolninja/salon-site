"use client";

import { useState } from "react";

import { format } from "date-fns";

import ModalForm from "../components/modalForm";

function Admin({ data }) {
  const [topData, setTopData] = useState(null);
  const [bottomData, setBottomData] = useState(null);

  function getAllAppointments() {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => {
        setTopData(data);
      });
  }

  function getOneAppointment(id) {
    fetch(`/api/appointments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBottomData(data);
      });
  }

  const clientFields = [
    {
      name: "firstName",
      type: "text",
      placeholder: "First Name",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      placeholder: "Last Name",
      required: true,
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email Address",
      required: false,
    },
    {
      name: "phone",
      type: "number",
      placeholder: "Phone Number",
      required: true,
    },
    {
      name: "notes",
      type: "text",
      placeholder: "Client Notes",
      required: false,
    },
  ];

  const handleClientSubmit = (formData) => {
    fetch("/api/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };

  return (
    <div className='flex m-2 first-line:rounded-lg'>
      <aside className='bg-gray-400 w-1/3 p-2'>
        <h3>Appointments</h3>
        <p onClick={getAllAppointments}>View Upcoming Appointments</p>
        <p>Create Appointment</p>
        <h3>Calendar</h3>
        <h3>Clients</h3>
        <p>View All Clients</p>
        <ModalForm
          title='Add Client'
          buttonTitle='Add Client'
          fields={clientFields}
          onSubmit={handleClientSubmit}
        />
        <h3>Services</h3>
        <p>View All Services</p>
        <p>Create Service</p>
      </aside>
      <div className='flex flex-col w-full'>
        <section className='bg-blue-500 h-1/2 p-2'>
          {topData ? (
            <ul>
              {topData.map((ele) => (
                <li key={ele.id} onClick={() => getOneAppointment(ele.id)}>
                  {format(new Date(ele.date_time), "MMM EEEE yy H:mm")}
                </li>
              ))}
            </ul>
          ) : (
            <p>No data</p>
          )}
        </section>
        <section className='bg-green-500 h-1/2 p-2'>
          {bottomData ? (
            <ul>
              <li>
                {format(new Date(bottomData.date_time), "MMM EEE yy H:mm")}
              </li>
              <li>{bottomData.firstName}</li>
              <li>{bottomData.lastName}</li>
              <li>{bottomData.services}</li>
              <li>{bottomData.status}</li>
              <li>{bottomData.notes}</li>
              <li>{bottomData.duration}</li>
              <li>{bottomData.price}</li>
            </ul>
          ) : (
            <p>No data</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Admin;
