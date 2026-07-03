import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

// initialState is the starting data of this Redux slice.
// First we check localStorage because pastes should not disappear after refresh.
// localStorage stores data in string form, so JSON.parse converts it back to array.
// If localStorage has no "pastes", then we start with an empty array.
const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const pasteSlice = createSlice({
  name: "paste",
  initialState,

  reducers: {
    // This reducer adds a new paste into Redux state
    addToPastes: (state, action) => {
      const paste = action.payload;

      state.pastes.push(paste);

      // Save updated pastes array into localStorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      toast.success("Paste Created Successfully");
    },

    // This reducer updates an existing paste
    updateToPastes: (state, action) => {
      const paste = action.payload;

      // Find paste by id
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;

        // Save updated array into localStorage
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        toast.success("Paste Updated Successfully");
      }
    },

    // This reducer deletes all pastes
    resetAllPastes: (state, action) => {
      state.pastes = [];

      // Remove all pastes from localStorage also
      localStorage.removeItem("pastes");

      toast.success("All Pastes Deleted Successfully");
    },

    // This reducer removes one paste using its id
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;

      state.pastes = state.pastes.filter((paste) => paste._id !== pasteId);

      // Save remaining pastes into localStorage
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      toast.success("Paste Deleted Successfully");
    },
  },
});

export const {
  addToPastes,
  updateToPastes,
  resetAllPastes,
  removeFromPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;