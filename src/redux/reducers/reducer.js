import { createSlice } from "@reduxjs/toolkit";
import { deleteTask, getTaskById, getTasks, tasksAdd, updateTask } from "../slices/taskSlice";

const initialState = {
  tasks: [],
  addTaskStatus: "",
  addTaskError: "",
  getTasksStatus: "",
  getTasksError: "",
  deleteTaskStatus: "",
  deleteTaskError: "",
  updateTaskStatus: "",
  updateTaskError: "",
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: {
    [tasksAdd.pending]: (state, action) => {
      return {
        ...state,
        addTaskStatus: "pending",
      };
    },
    [tasksAdd.fulfilled]: (state, action) => {
      // state.tasks.push(action.payload);
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        addTaskStatus: "success",
        
      };
    },
    [tasksAdd.rejected]: (state, action) => {
      return {
        ...state,
        addTaskStatus: "rejected",
        addTaskError: action.payload,
      };
    },
    [getTasks.pending]: (state, action) => {
      return {
        ...state,
        getTasksStatus: "pending",
      };
    },
    [getTasks.fulfilled]: (state, action) => {
      return {
        ...state,
        tasks: action.payload,
        getTasksStatus: "success",
      };
    },
    [getTasks.rejected]: (state, action) => {
      return {
        ...state,
        getTasksStatus: "rejected",
        getTasksError: action.payload,
      };
    },
    [deleteTask.pending]: (state, action) => {
      return {
        ...state,
        deleteTaskStatus: "pending",
      };
    },
    [deleteTask.fulfilled]: (state, action) => {
      const currentTasks = state.tasks.filter(
        (task) => task._id !== action.payload._id
      );
      return {
        ...state,
        tasks: currentTasks,
        deleteTaskStatus: "success",
      };
    },
    [deleteTask.rejected]: (state, action) => {
      state = {
        ...state,
        deleteTaskStatus: "rejected",
        deleteTaskError: action.payload,
      };
    },
    [updateTask.pending]: (state, action) => {
      return {
        ...state,
        updateTaskStatus: "pending",
      };
    },
    [updateTask.fulfilled]: (state, action) => {
      const updatedTasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
      return {
        ...state,
        tasks: updatedTasks,
        updateTaskStatus: "success",
      };
    },
    [updateTask.rejected]: (state, action) => {
      return {
        ...state,
        updateTaskStatus: "rejected",
        updateTaskError: action.payload,
      };
    },
    [getTaskById.pending]: (state, action) => {
      return {
        ...state,
        getTasksStatus: "pending",
      };
    },
    [getTaskById.fulfilled]: (state, action) => {
      return {
        ...state,
        tasks: action.payload,
        getTasksStatus: "success",
      };
    },
    [getTaskById.rejected]: (state, action) => {
      return {
        ...state,
        getTasksStatus: "rejected",
        getTasksError: action.payload,
      };
    },
  },
});

export default tasksSlice.reducer;