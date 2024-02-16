import { AuthEmptyState, AuthSession } from "@/models/auth.type";
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: AuthEmptyState,
  reducers: {
    setCredentials: (state, action: { payload: AuthSession; type: string }) => {
      const newCredentials: AuthSession = {
        ...state,
        ...action.payload,
      };
      return newCredentials;
    },
    setAsConfigurationCompleted: (state) => {
      const newState = {
        ...state,
        user: { ...state.user, isConfigurationComplete: true },
      };
      return newState;
    },
    resetCredentials: () => {},
  },
});

export const { setCredentials, resetCredentials, setAsConfigurationCompleted } =
  authSlice.actions;

export default authSlice.reducer;
