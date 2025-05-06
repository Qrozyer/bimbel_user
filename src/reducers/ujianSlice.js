import { createSlice } from '@reduxjs/toolkit';

const ujianSlice = createSlice({
  name: 'ujian',
  initialState: {
    durasi: 0, // Durasi ujian default
  },
  reducers: {
    setDurasi: (state, action) => {
      state.durasi = action.payload; // Menyimpan durasi ujian
    },
  },
});

export const { setDurasi } = ujianSlice.actions;
export default ujianSlice.reducer;
