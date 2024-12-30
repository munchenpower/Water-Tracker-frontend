import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL;

axios.defaults.baseURL = URL;

export const fetchTodayWater = createAsyncThunk(
  'water/fetchTodayWater',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/water/today');
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addWater = createAsyncThunk(
  'water/addWater',
  async (waterData, thunkAPI) => {
    try {
      const response = await axios.post('/water', waterData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateWater = createAsyncThunk(
  'water/updateWater',
  async ({ id, waterData }, thunkAPI) => {
    try {
      const response = await axios.patch(`/water/${id}`, waterData);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (id, thunkAPI) => {
    try {
      await axios.delete(`/water/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getWaterMonth = createAsyncThunk(
  'water/addMonth',
  async (month, thunkAPI) => {
    try {
      const result = await axios.post('/water/month', month);
      return result.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
