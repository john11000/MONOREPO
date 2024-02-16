import { AppEmptyState } from "@/models/app.type";
import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: AppEmptyState,
  reducers: {
    setAppBarTitle: (state, action: { payload: string; type: string }) => {
      return { ...state, appBarTitle: action.payload };
    },
    setDrawerOpen: (state, action: { payload: boolean; type: string }) => {
      const newState = { ...state, drawerOpen: action.payload };
      return newState;
    },
    resetAppState: () => {
      return AppEmptyState;
    },
  },
});

export const { setAppBarTitle, setDrawerOpen, resetAppState } =
  appSlice.actions;

export default appSlice.reducer;
