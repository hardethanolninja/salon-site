import React from "react";

import { format } from "date-fns";

function TopDataRow({ onClick, data }) {
  const hours = Math.floor(data.duration / 60);
  const minutes = data.duration % 60;

  const now = new Date();
  //for appointments
  if (data.status) {
    if (now < data.date_time) {
      return (
        <li
          onClick={onClick}
          className='cursor-pointer my-1 p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 transition duration-150 ease-in-out rounded-md'
        >
          <div className='flex'>
            <span className='w-1/4'>Client Name: {data.lastName}</span>
            <span className='w-1/2'>
              {format(new Date(data.date_time), "PPPPpp")}
            </span>
            <span className='w-1/4'>
              {hours} Hours {minutes} Minutes
            </span>
          </div>
        </li>
      );
    }
  }
  //for clients
  if (data.phone) {
    return (
      <li
        onClick={onClick}
        className='cursor-pointer my-1 p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 transition duration-150 ease-in-out rounded-md'
      >
        <div className='flex'>
          <span className='w-1/4'>
            {data.firstName} {data.lastName}
          </span>
          <span className='w-1/4'>{data.phone}</span>
          <span className='w-1/4'>{data.email}</span>
          <span className='w-1/4'>{data.status ? data.status : "Client"}</span>
        </div>
      </li>
    );
  }
  //for services
  if (data.name) {
    return (
      <li
        onClick={onClick}
        className='cursor-pointer my-1 p-3 bg-blue-100 hover:bg-blue-200 text-blue-700 transition duration-150 ease-in-out rounded-md'
      >
        <div className='flex'>
          <span className='w-1/3'>{data.name}</span>
          <span className='w-1/3'>${data.price}</span>
          <span className='w-1/3'>
            Duration: {data.hours}:{data.minutes}
          </span>
        </div>
      </li>
    );
  }
}

export default TopDataRow;
