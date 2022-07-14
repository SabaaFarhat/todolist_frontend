import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://localhost:5000/tasks/';

export const tasksAdd = createAsyncThunk(
  'tasks/tasksAdd',
  async (task, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL + 'createTask', task);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (id = null) => {
    try {
      const response = await axios.get(baseURL + 'all');
      return response.data;
    } catch (error) {
      return console.log(error);
    }
  }
);

export const getTaskById = createAsyncThunk('tasks/getTaskById', async (id) => {
  try {
    const task = await axios.get(baseURL + id).catch((err) => {
      console.log(err);
    });
    return task.data;
  } catch (error) {
    return console.log(error);
  }
});

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(baseURL + 'deleteTask/' + id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (task, id, { rejectWithValue }) => {
    try {
      const { taskName, completed, startedDate, finishedDate, Duration } = task;

      const response = await axios.put(baseURL + 'updateTask/' + id, {
        taskName,
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

// export async function updateTask(id, task) {
//   return await axios
//     .put(baseURL+ 'updateTask/' + id, task, {})
//     .then((res) => {
//       console.log("task updated!");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }
