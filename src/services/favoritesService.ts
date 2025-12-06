import { createAsyncThunk } from '@reduxjs/toolkit';
const API_BASE = process.env.NEXT_PUBLIC_API_BASE;


const FAVORİTE_API = `${API_BASE}/favorites`;

const getToken = () => localStorage.getItem("token");

// Favorileri Getir
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchFavorites',
  async (_, thunkAPI) => {
    const token = getToken();
    const response = await fetch(FAVORİTE_API, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue("Favoriler alınamadı");
    }

    const data = await response.json();
    return data;
  }
);
// Favori Ekle
export const addToFavorites = createAsyncThunk(
  'favorites/addToFavorites',
  async (productId: number, thunkAPI) => {
    const token = getToken();
    const response = await fetch(`${FAVORİTE_API}/add/${productId}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return thunkAPI.rejectWithValue(errorMessage || "Favori eklenemedi");
    }
    //  productId 
    return { productId };
  }
);

// Favori Sil
export const removeFavorites = createAsyncThunk(
  'favorites/removeFavorites',
  async (productId: number, thunkAPI) => {
    const token = getToken();
    const response = await fetch(`${FAVORİTE_API}/remove/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return thunkAPI.rejectWithValue("Favoriden kaldırılamadı");
    }
    return productId;
  }
);

