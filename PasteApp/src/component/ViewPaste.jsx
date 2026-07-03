import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  // Getting id from URL
  // Example URL: /pastes/abc123
  const { id } = useParams();

  // Getting all pastes from Redux store
  const allPastes = useSelector((state) => state.paste.pastes);

  // Finding the paste whose _id matches URL id
  const paste = allPastes.find((p) => p._id === id);

  // If paste is not found
  if (!paste) {
    return (
      <div className="rounded-xl bg-white p-6 text-center shadow">
        <h2 className="text-2xl font-bold text-red-600">
          Paste Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        View Paste
      </h1>

      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="w-[66%] rounded-lg border border-gray-300 bg-gray-100 p-3 text-gray-700 outline-none"
          type="text"
          placeholder="enter title here"
          value={paste.title}
          //   disabled means the input field is not editable
          disabled
        />
      </div>

      <div className="mt-8">
        <textarea
          className="min-h-[400px] w-full rounded-lg border border-gray-300 bg-gray-100 p-4 text-gray-700 outline-none"
          value={paste.content}
          placeholder="enter content here"
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;