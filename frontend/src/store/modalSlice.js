import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modals",
  initialState: {
    closedModals: {},
  },
  reducers: {
    closeModal: (state, action) => {
      const modalId = action.payload;
      state.closedModals[modalId] = Date.now();
    },
    clearClosedModals: (state) => {
      state.closedModals = {};
    },
  },
});

export const { closeModal, clearClosedModals } = modalSlice.actions;
export default modalSlice.reducer;
