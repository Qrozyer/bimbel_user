// src/slices/pesertaSlice.js
import { createSlice } from '@reduxjs/toolkit';

const pesertaSlice = createSlice({
  name: 'peserta',
  initialState: null, // Nilai awal state peserta
  reducers: {
    setPeserta: (state, action) => action.payload,
    clearPeserta: () => null,
  },
});

export const { setPeserta, clearPeserta } = pesertaSlice.actions;
export default pesertaSlice.reducer;
