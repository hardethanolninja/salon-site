import React from "react";

import { format, compareAsc } from "date-fns";

function TopDataRow({ onClick, data }) {
  const hours = Math.floor(data.duration / 60);
  const minutes = data.duration % 60;

  const now = new Date();
  //for appointments
  if (data.status) {
    if (compareAsc(data.date_time, now) >= 0) {
      return (
        <li
          onClick={onClick}
          className='p-3 my-1 text-blue-700 transition duration-150 ease-in-out bg-blue-100 rounded-md cursor-pointer hover:bg-blue-200'
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
        className='p-3 my-1 text-blue-700 transition duration-150 ease-in-out bg-blue-100 rounded-md cursor-pointer hover:bg-blue-200'
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
        className='p-3 my-1 text-blue-700 transition duration-150 ease-in-out bg-blue-100 rounded-md cursor-pointer hover:bg-blue-200'
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
