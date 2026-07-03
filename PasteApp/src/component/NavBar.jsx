import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row items-center justify-between bg-white px-8 py-4 shadow">
      <div className="text-xl font-bold text-blue-600">
        Paste App
      </div>

      <div className="flex flex-row gap-4">
        <NavLink
          to="/"
          className="rounded-lg px-4 py-2 font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600"
        >
          Home
        </NavLink>

        <NavLink
          to="/pastes"
          className="rounded-lg px-4 py-2 font-medium text-gray-700 hover:bg-blue-100 hover:text-blue-600"
        >
          Pastes
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;