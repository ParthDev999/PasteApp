import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updateToPastes } from "../redux/pasteSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // Getting all pastes from Redux store
  const allPastes = useSelector((state) => state.paste.pastes);

  // This useEffect runs when pasteId changes.
  // If pasteId exists, it means user clicked Edit.
  // So we find that paste from Redux and fill title/content automatically.
  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);

      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // update existing paste
      dispatch(updateToPastes(paste));
      navigate("/pastes");
    } else {
      // create new paste
      dispatch(addToPastes(paste));
    }

    // Clear fields after create/update
    setTitle("");
    setValue("");

    // Remove pasteId from URL after update
    setSearchParams({});
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        {pasteId ? "Update Paste" : "Create Paste"}
      </h1>

      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="w-[66%] rounded-lg border border-gray-300 p-3 outline-none focus:border-blue-500"
          type="text"
          placeholder="enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="mt-8">
        <textarea
          className="min-h-[400px] w-full rounded-lg border border-gray-300 p-4 outline-none focus:border-blue-500"
          value={value}
          placeholder="enter content here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  );
};

export default Home;