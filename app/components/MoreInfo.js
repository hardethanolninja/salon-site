import React from "react";

import { format } from "date-fns";

function MoreInfo({ data, handleEdit, handleDelete }) {
  const hours = Math.floor(data.duration / 60);
  const minutes = data.duration % 60;

  const trashCan = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-4 h-4'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth='2'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
      />
    </svg>
  );

  const editIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='w-4 h-4'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth='2'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L12 21H3v-9l10.768-10.768z'
      />
    </svg>
  );

  if (data.status) {
    return (
      <div className='p-4 rounded-lg shadow-md bg-blue-50'>
        <div className='flex flex-row justify-between'>
          <h3 className='mb-2 text-lg font-semibold text-blue-800'>
            {data.firstName} {data.lastName}&apos;s Appointment Details
          </h3>
          <div>
            <button
              type='button'
              className='p-2 mx-1 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-75'
              title='Edit'
              onClick={() => handleEdit(data.id)}
            >
              {editIcon}
            </button>
            <button
              type='button'
              className='p-2 mx-1 font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-75'
              title='Delete'
              onClick={() => handleDelete("appointments", data.id)}
            >
              {trashCan}
            </button>
          </div>
        </div>
        <div className='flex flex-row p-2'>
          <div className='w-1/2 p-3 bg-blue-100 rounded-md'>
            <p className='text-blue-700'>
              Date: {format(new Date(data.date_time), "dd MMMM yy")}
            </p>
            <p className='text-blue-700'>
              Time: {format(new Date(data.date_time), "p")}
            </p>
            <p className='text-blue-700'>
              Duration: {hours} hours {minutes} minutes
            </p>
            <p className='text-blue-700'>Status: {data.status}</p>
            <p className='font-bold text-blue-700'>Estimate: ${data.price}</p>
          </div>
          <div className='flex flex-grow px-2'>
            <div className='w-2/5 p-2 bg-blue-100 rounded-md'>
              <h4 className='font-bold text-blue-700'>Services:</h4>
              <ul className='w-1 ml-4 list-decimal'>
                {data.services.map((service, index) => (
                  <li key={index} className='text-blue-600 text-wrap'>
                    {service.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex flex-col flex-grow px-2 mx-2 bg-blue-100 rounded-md'>
              <h4 className='mt-2 font-bold text-blue-700'>Notes:</h4>
              <p className='text-blue-600 '>{data.notes}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data.phone) {
    return (
      <div className='p-4 rounded-lg shadow-md bg-blue-50'>
        <div className='flex flex-row justify-between'>
          <h3 className='mb-2 text-lg font-semibold text-blue-800'>
            {data.firstName} {data.lastName}
          </h3>
          <div>
            <button
              type='button'
              className='p-2 mx-1 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-75'
              title='Edit'
            >
              {editIcon}
            </button>
            <button
              type='button'
              className='p-2 mx-1 font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-75'
              title='Delete'
            >
              {trashCan}
            </button>
          </div>
        </div>
        <div className='flex flex-row p-2'>
          <div className='w-1/3 p-3 bg-blue-100 rounded-md'>
            <p className='text-blue-700'></p>
            <p className='text-blue-700'></p>
            <p className='text-blue-700'>Phone: {data.phone}</p>
            <p className='text-blue-700 '>Email: {data.email}</p>
            <p className='text-blue-700 '>
              Status: {data.status ? data.status : "Client"}
            </p>
          </div>
          <div className='flex flex-grow w-2/3 px-2'>
            <div className='flex flex-col flex-grow px-2 mx-2 bg-blue-100 rounded-md'>
              <h4 className='mt-2 font-bold text-blue-700'>Notes:</h4>
              <p className='text-blue-600 '>{data.notes}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (data.name) {
    return (
      <div className='p-4 rounded-lg shadow-md bg-blue-50'>
        <div className='flex flex-row justify-between'>
          <h3 className='mb-2 text-lg font-semibold text-blue-800'>
            {data.name}
          </h3>
          <div>
            <button
              type='button'
              className='p-2 mx-1 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-75'
              title='Edit'
            >
              {editIcon}
            </button>
            <button
              type='button'
              className='p-2 mx-1 font-semibold text-white bg-red-500 rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-opacity-75'
              title='Delete'
            >
              {trashCan}
            </button>
          </div>
        </div>
        <div className='flex flex-row p-2'>
          <div className='w-1/3 p-3 bg-blue-100 rounded-md'>
            <p className='text-blue-700'></p>
            <p className='text-blue-700'></p>
            <p className='text-blue-700'>
              Duration: {Math.floor(data.time / 60)}:{data.time % 60}
            </p>
            <p className='font-bold text-blue-700'>Price: ${data.price}</p>
          </div>
          <div className='flex flex-grow w-2/3 px-2'>
            <div className='flex flex-col flex-grow px-2 mx-2 bg-blue-100 rounded-md'>
              <h4 className='mt-2 font-bold text-blue-700'>Description:</h4>
              <p className='text-blue-600 '>{data.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MoreInfo;
