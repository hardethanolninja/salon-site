import React, { useState } from "react";

function ModalForm({ title, buttonTitle, fields, multiple, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, options } = e.target;

    if (e.target.type === "select-multiple") {
      // For a multiple select, you need to iterate over all options and filter out the selected ones
      const value = Array.from(options) // Convert options to an array
        .filter((option) => option.selected) // Filter to only selected options
        .map((option) => option.value); // Map to an array of values
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      // For other input types including single select
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
    setIsOpen(false); // Close modal after submission
    setFormData({});
  };

  return (
    <>
      <button
        className='w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
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
                {fields.map((field, index) => {
                  if (field.type === "select") {
                    return (
                      <div key={field.name} className='border border-white'>
                        <label htmlFor={field.name} className=''>
                          {field.placeholder}
                        </label>
                        <select
                          className='w-full px-3 py-2 border shadow-sm border-slate-300 rounded-md focus:outline-none focus:border-blue-500'
                          name={field.name}
                          required={field.required}
                          key={field.name}
                          onChange={handleChange} // Attach the onChange handler here
                          multiple={field.multiple} // Use field.multiple to control the attribute
                        >
                          {field.options.map((option) => (
                            <option value={option.value} key={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    );
                  } else {
                    return (
                      <input
                        key={field.name}
                        type={field.type}
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className='w-full px-3 py-2 border shadow-sm border-slate-300 rounded-md focus:outline-none focus:border-blue-500'
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    );
                  }
                })}
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
