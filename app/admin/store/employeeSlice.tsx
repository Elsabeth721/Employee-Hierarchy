import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig"; // Import Firestore instance

// Define Employee Type
interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
}

// Initial State Type
interface EmployeesState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: EmployeesState = {
  employees: [],
  loading: false,
  error: null,
};

// Fetch Employees from Firestore
export const fetchEmployees = createAsyncThunk<Employee[]>(
  "employees/fetchEmployees",
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "employees"));
      const employeesData: Employee[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Employee[];
      return employeesData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch employees";
      });
  },
});

export default employeesSlice.reducer;
