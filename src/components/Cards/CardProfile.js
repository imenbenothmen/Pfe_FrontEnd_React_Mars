import React, { useState, useEffect } from "react";

export default function CardProfile({ data, editMode, onEdit, onCancel, onUpdate }) {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  if (editMode) {
    return (
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 p-6">
        <h3 className="text-xl font-semibold mb-4">Modifier Profil</h3>
        <form onSubmit={handleSubmit}>
          {["username", "email", "phone", "delivery_address"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-blueGray-600 capitalize mb-1">{field.replace("_", " ")}</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lightBlue-500"
              />
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="mr-4 px-5 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-lightBlue-500 text-white font-semibold rounded hover:bg-lightBlue-600 transition"
            >
              Sauvegarder
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-3/12 px-4 flex justify-center">
            <div className="relative">
              <img
                alt="..."
                src={`http://localhost:5000/files/${data.user_image}`}
                className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
              />
            </div>
          </div>
          <div className="w-full lg:w-4/12 px-4 text-center mt-20">
            <h3 className="text-4xl font-semibold leading-normal text-blueGray-700">
              {data.username}
            </h3>
            <p className="text-sm text-blueGray-400">{data.email}</p>
            <p className="text-sm text-blueGray-400">{data.phone}</p>
            <p className="text-sm text-blueGray-400">{data.delivery_address}</p>
          </div>
        </div>

        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
          <div className="w-full lg:w-9/12 px-4 mx-auto">
            <button
              onClick={onEdit}
              className="inline-block px-6 py-3 bg-lightBlue-500 text-white font-semibold rounded-md shadow hover:bg-lightBlue-600 transition"
            >
              Modifier le profil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
