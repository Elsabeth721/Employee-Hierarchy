// actions/positionActions.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
    fetchPositionsFromApi, 
    addPositionToApi, 
    updatePositionInApi, 
    deletePositionFromApi 
  } from '../../services/positionService';  // ✅ Ensure this path is correct
import { addPosition, fetchPositions } from '../../store/slices/positionSlice';
  
export const loadPositions = createAsyncThunk('positions/load', async () => {
  const positions = await fetchPositions();
  return positions;
});

export const createPosition = createAsyncThunk('positions/create', async (position: Record<string, any>) => {
  const newPosition = await addPosition(position);
  return newPosition;
});

export const updatePosition = createAsyncThunk('positions/update', async (position: { id: string; [key: string]: any }) => {
  await updatePositionInApi(position.id, position);
  return position;
});

export const removePosition = createAsyncThunk('positions/remove', async (id: string) => {
  await removePosition(id);
  return id;
});