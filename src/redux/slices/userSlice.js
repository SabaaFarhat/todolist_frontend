import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:5000/users/';

export const usersAdd = createAsyncThunk(
  'users/usersAdd',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL + 'createUser', user);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (id = null) => {
    try {
      const response = await axios.get(baseURL + 'all');
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const getUserById = createAsyncThunk('users/getUserById', async (id) => {
  try {
    const user = await axios.get(baseURL + id).catch((err) => {
      console.log(err);
    });
    return user.data;
  } catch (error) {
    return console.log(error);
  }
});

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(baseURL + 'deleteUser/' + id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (user, id, { rejectWithValue }) => {
    try {
      const { userName, completed, startedDate, finishedDate, Duration } = user;

      const response = await axios.put(baseURL + 'updateUser/' + id, {
        userName,
        completed,
        startedDate,
        finishedDate,
        Duration,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);
