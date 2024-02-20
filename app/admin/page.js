"use client";

import { useEffect, useState } from "react";

import { format } from "date-fns";

import ModalForm from "../components/modalForm";
import TopDataRow from "../components/TopDataRow";
import MoreInfo from "../components/MoreInfo";

function Admin({ data }) {
  const [topData, setTopData] = useState(null);
  const [bottomData, setBottomData] = useState(null);
  const [clients, setClients] = useState(null);
  const [services, setServices] = useState(null);
  const [appointmentFields, setAppointmentFields] = useState([]);
  const [clientFields, setClientFields] = useState([]);

  function getAllAppointments() {
    fetch("/api/appointments")
      .then((res) => res.json())
      .then((data) => {
        setTopData(data);
      })
      .catch((err) => console.error(err));
  }

  function getOneAppointment(id) {
    fetch(`/api/appointments/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBottomData(data);
      })
      .catch((err) => console.error(err));
  }

  function getAllClients() {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((data) => {
        setTopData(data);
      })
      .catch((err) => console.error(err));
  }

  function getOneClient(id) {
    fetch(`/api/clients/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBottomData(data);
      })
      .catch((err) => console.error(err));
  }

  //get all services

  function getOneService(id) {
    fetch(`/api/services/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBottomData(data);
      })
      .catch((err) => console.error(err));
  }

  function getAllServices() {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((clientData) => {
        setClients(clientData);

        const fields = [
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

        setClientFields(fields);

        fetch("/api/services")
          .then((res) => res.json())
          .then((servicesData) => {
            setServices(servicesData);

            const fields = [
              {
                name: "date_time",
                type: "datetime-local",
                placeholder: "Appointment Time",
                required: true,
              },
              {
                name: "clientId",
                type: "select",
                placeholder: "Select Client",
                required: true,
                options: clientData.map((client) => ({
                  // Use fetched clients here
                  value: client.id,
                  label: client.lastName,
                })),
              },
              {
                name: "services",
                type: "select",
                placeholder: "Select Services",
                required: false,
                multiple: true,
                options: servicesData.map((service) => ({
                  // Use fetched services here
                  value: service.id,
                  label: service.name,
                })),
              },
              {
                name: "notes",
                type: "text",
                placeholder: "Appointment Notes",
                required: false,
              },
              {
                name: "price",
                type: "number",
                placeholder: "Appointment Price",
                required: false,
              },
            ];

            setAppointmentFields(fields);
            setTopData(servicesData);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  const serviceFields = [
    {
      name: "name",
      type: "text",
      placeholder: "Service name",
      required: true,
    },
    {
      name: "description",
      type: "text",
      placeholder: "Service Description",
      required: true,
    },
    {
      name: "price",
      type: "text",
      placeholder: "Service Price",
      required: false,
    },
    {
      name: "time",
      type: "number",
      placeholder: "Service Time",
      required: false,
    },
    {
      name: "image",
      type: "text",
      placeholder: "Service Image",
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
      .catch((error) => console.error(error));
  };

  const handleServiceSubmit = (formData) => {
    fetch("/api/services", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .catch((error) => console.error(error));
  };

  const handleAppointmentSubmit = (formData) => {
    fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .catch((error) => console.error(error));
  };

  return (
    <div className='flex flex-col h-screen overflow-hidden md:flex-row'>
      <aside className='w-full p-4 overflow-auto bg-blue-50 md:w-1/4 xl:w-1/4'>
        <h3 className='mt-2 text-3xl font-bold text-blue-900'>Appointments</h3>
        <p
          className='px-4 py-2 my-2 text-center text-white bg-blue-500 rounded hover:bg-blue-700'
          onClick={getAllAppointments}
        >
          View Upcoming Appointments
        </p>
        <ModalForm
          title='Create Appointment'
          buttonTitle='Create Appointment'
          fields={appointmentFields}
          onSubmit={handleAppointmentSubmit}
          onClick={getAllClients}
        />
        <h3 className='mt-2 text-3xl font-bold text-blue-900'>Calendar</h3>
        <p className='px-4 py-2 my-2 text-center text-white bg-blue-500 rounded hover:bg-blue-700'>
          View Calendar
        </p>
        <h3 className='mt-2 text-3xl font-bold text-blue-900'>Clients</h3>
        <p
          className='px-4 py-2 my-2 text-center text-white bg-blue-500 rounded hover:bg-blue-700'
          onClick={getAllClients}
        >
          View All Clients
        </p>
        <ModalForm
          title='Add Client'
          buttonTitle='Add Client'
          fields={clientFields}
          onSubmit={handleClientSubmit}
        />
        <h3 className='mt-2 text-3xl font-bold text-blue-900'>Services</h3>
        <p
          onClick={getAllServices}
          className='px-4 py-2 my-2 text-center text-white bg-blue-500 rounded hover:bg-blue-700'
        >
          View All Services
        </p>

        <ModalForm
          title='Create Service'
          buttonTitle='Create Service'
          fields={serviceFields}
          onSubmit={handleServiceSubmit}
        />
      </aside>
      <div className='flex flex-col w-3/4'>
        <section className='flex-grow p-4 overflow-auto border border-blue-500'>
          {topData ? (
            <ul>
              {topData.map((ele) => (
                <TopDataRow
                  key={ele.id}
                  onClick={() => {
                    ele.status
                      ? getOneAppointment(ele.id)
                      : ele.name
                      ? getOneService(ele.id)
                      : getOneClient(ele.id);
                  }}
                  data={ele}
                />
              ))}
            </ul>
          ) : (
            <p>No data</p>
          )}
        </section>
        <section className='flex-grow p-4 overflow-auto bg-blue-100'>
          {bottomData !== null && <MoreInfo data={bottomData[0]} />}
        </section>
      </div>
    </div>
  );
}

export default Admin;
