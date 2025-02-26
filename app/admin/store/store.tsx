import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employeeSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['positions/fetchPositions/fulfilled'], // ✅ Ignore specific actions
      },
    }), 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
