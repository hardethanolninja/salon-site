import React, { useState } from "react";

function ModalForm({ title, buttonTitle, fields, onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [totalMinutes, setTotalMinutes] = useState(30);

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
    const formDataWithDuration = { ...formData, duration: totalMinutes };
    console.log(formDataWithDuration);
    onSubmit(formDataWithDuration);
    setIsOpen(false); // Close modal after submission
    setFormData({});
  };

  return (
    <>
      <button
        className='w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700'
        onClick={() => setIsOpen(true)}
      >
        {buttonTitle}
      </button>

      {isOpen && (
        <div className='fixed inset-0 flex items-center justify-center w-full h-full overflow-y-auto bg-black bg-opacity-50'>
          <div className='relative p-5 mx-auto bg-white border rounded-md shadow-lg w-96'>
            <div className='text-center'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
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
                          className='w-full px-3 py-2 border rounded-md shadow-sm border-slate-300 focus:outline-none focus:border-blue-500'
                          name={field.name}
                          required={field.required}
                          key={field.name}
                          defaultValue={field.defaultValue}
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
                  } else if (field.type === "range") {
                    const handleChange = (e) => {
                      setTotalMinutes(parseInt(e.target.value));
                    };

                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;

                    return (
                      <div className='slider-container' key={field.name}>
                        <label className='slider-label'>
                          Duration of Appointment:
                        </label>
                        <br />
                        <input
                          type='range'
                          min={field.min}
                          max={field.max}
                          step={field.step}
                          name={field.name}
                          value={totalMinutes}
                          onChange={handleChange}
                          className='slider'
                        />
                        <span className='slider-value'>{hours}</span> Hours
                        {"  "}
                        <span className='slider-value'>{minutes}</span> Minutes
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
                        className='w-full px-3 py-2 border rounded-md shadow-sm border-slate-300 focus:outline-none focus:border-blue-500'
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    );
                  }
                })}
                <div className='flex items-center justify-center space-x-4'>
                  <button
                    type='submit'
                    className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-700'
                  >
                    Submit
                  </button>
                  <button
                    type='button'
                    className='px-4 py-2 text-blue-700 bg-white border border-blue-500 rounded hover:bg-gray-100'
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
