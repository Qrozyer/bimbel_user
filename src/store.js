// src/store.js
import { configureStore } from '@reduxjs/toolkit';  // Menggunakan Redux Toolkit
import rootReducer from './reducers'; // Mengimpor rootReducer yang sudah digabungkan

// Membuat store Redux dengan rootReducer menggunakan configureStore
const store = configureStore({
  reducer: rootReducer,  // Masukkan rootReducer di sini
});

export default store;
