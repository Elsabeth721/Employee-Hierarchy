// src/store/slices/positionsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
    fetchPositionsFromApi, 
    addPositionToApi, 
    updatePositionInApi, 
    deletePositionFromApi 
  } from '../../services/positionService';  // ✅ Ensure this path is correct
  
// Define the initial state for positions
interface PositionState {
  list: Array<any>;  // Array to store position data
  status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Status of the data fetch
  error: string | null; // Error message if any
}

const initialState: PositionState = {
  list: [],
  status: 'idle',
  error: null,
};

// Async Thunks (to interact with Firebase or any API)

export const fetchPositions = createAsyncThunk(
    'positions/fetchPositions',
    async (_, { rejectWithValue }) => {
      try {
        const data = await fetchPositionsFromApi(); // ✅ Ensure it's JSON
        return data; 
      } catch (error) {
        return rejectWithValue((error as any).message); // ✅ Ensures error is a string
      }
    }
  );
  

export const addPosition = createAsyncThunk(
  'positions/addPosition',
  async (newPosition: any) => {
    const response = await addPositionToApi(newPosition);
    return response.data;  // Return the added position object
  }
);

export const updatePosition = createAsyncThunk(
  'positions/updatePosition',
  async (updatedPosition: any) => {
    const response = await updatePositionInApi(updatedPosition.id, updatedPosition);
    return response.data;  // Return the updated position object
  }
);

export const deletePosition = createAsyncThunk(
  'positions/deletePosition',
  async (id: string) => {
    await deletePositionFromApi(id);
    return id;  // Return the id of the deleted position
  }
);

// Create the positions slice using createSlice
const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle fetching positions
    builder
      .addCase(fetchPositions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPositions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload;
      })
      .addCase(fetchPositions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to load positions';
      })

      // Handle adding a position
      .addCase(addPosition.fulfilled, (state, action) => {
        state.list.push(action.payload);  // Add new position to the list
      })

      // Handle updating a position
      .addCase(updatePosition.fulfilled, (state, action) => {
        const index = state.list.findIndex((pos) => pos.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;  // Update the position in the list
        }
      })

      // Handle deleting a position
      .addCase(deletePosition.fulfilled, (state, action) => {
        state.list = state.list.filter((pos) => pos.id !== action.payload);  // Remove the deleted position
      });
  },
});

export default positionsSlice.reducer;
