import React, { useState } from "react";

function ModalForm({ title, buttonTitle, fields, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    setIsOpen(false); // Close modal after submission
  };

  return (
    <>
      <button
        className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
        onClick={() => setIsOpen(true)}
      >
        {buttonTitle}
      </button>

      {isOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center'>
          <div className='relative mx-auto p-5 border w-96 shadow-lg rounded-md bg-white'>
            <div className='text-center'>
              <h3 className='text-lg leading-6 font-medium text-gray-900'>
                {title}
              </h3>
              <form onSubmit={handleSubmit} className='mt-2 space-y-4'>
                {fields.map((field, index) => (
                  <input
                    key={index}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className='w-full px-3 py-2 border shadow-sm border-slate-300 rounded-md focus:outline-none focus:border-blue-500'
                    placeholder={field.placeholder}
                    required={field.required}
                  />
                ))}
                <div className='flex justify-center items-center space-x-4'>
                  <button
                    type='submit'
                    className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
                  >
                    Submit
                  </button>
                  <button
                    type='button'
                    className='px-4 py-2 bg-white text-blue-700 border border-blue-500 rounded hover:bg-gray-100'
                    onClick={() => setIsOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalForm;
