import { createSlice } from "@reduxjs/toolkit";

const popupSlice = createSlice({
  name: "popups",
  initialState: {
    closedPopups: [],
  },
  reducers: {
    closePopup: (state, action) => {
      const popupId = action.payload;
      if (!state.closedPopups.includes(popupId)) {
        state.closedPopups.push(popupId);
      }
    },
    clearClosedPopups: (state) => {
      state.closedPopups = [];
    },
  },
});

export const { closePopup, clearClosedPopups } = popupSlice.actions;
export default popupSlice.reducer;
