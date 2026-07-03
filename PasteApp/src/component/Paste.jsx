import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Paste = () => {
  // Reading all pastes from Redux store
  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  // Filtering pastes according to search input
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleCopy(content) {
    navigator.clipboard.writeText(content);
    toast.success("Copied to Clipboard");
  }

  function handleShare(paste) {
    if (navigator.share) {
      navigator.share({
        title: paste.title,
        text: paste.content,
      });
    } else {
      navigator.clipboard.writeText(paste.content);
      toast.success("Content copied for sharing");
    }
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="mb-5 flex flex-col gap-3">
        <h1 className="text-2xl font-bold text-gray-800">
          All Pastes
        </h1>

        <input
          className="w-full rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
          type="search"
          placeholder="search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => {
            return (
              <div
                key={paste._id}
                className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm hover:shadow-md transition"
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="w-full">
                    <div className="text-2xl font-bold text-gray-800">
                      {paste.title}
                    </div>

                    <div className="mt-3 whitespace-pre-wrap rounded-lg bg-white p-3 text-gray-700 border border-gray-200">
                      {paste.content}
                    </div>

                    <div className="mt-3 text-sm text-gray-500">
                      {paste.createdAt}
                    </div>
                  </div>

                  <div className="flex flex-row gap-2 md:flex-row md:items-end">
                    <Link to={`/?pasteId=${paste._id}`}>
                      <button
                        title="Edit"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      >
                        ✏️
                      </button>
                    </Link>

                    <Link to={`/pastes/${paste._id}`}>
                      <button
                        title="View"
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        👁️
                      </button>
                    </Link>

                    <button
                      onClick={() => handleDelete(paste._id)}
                      title="Delete"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-700 hover:bg-red-200"
                    >
                      🗑️
                    </button>

                    <button
                      onClick={() => handleCopy(paste.content)}
                      title="Copy"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-700 hover:bg-green-200"
                    >
                      📋
                    </button>

                    <button
                      onClick={() => handleShare(paste)}
                      title="Share"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700 hover:bg-purple-200"
                    >
                      🔗
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-lg bg-gray-50 p-5 text-center text-gray-500">
            No Pastes Found
          </div>
        )}
      </div>
    </div>
  );
};

export default Paste;