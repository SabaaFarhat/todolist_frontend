import { createSlice } from "@reduxjs/toolkit";
import { deleteTask, getTasks, tasksAdd, updateTask } from "./slices/taskSlice";

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
        addTaskError: "",
        getTasksStatus: "",
        getTasksError: "",
        deleteTaskStatus: "",
        deleteTaskError: "",
        updateTaskStatus: "",
        updateTaskError: "",
      };
    },
    [tasksAdd.fulfilled]: (state, action) => {
      // state.tasks.push(action.payload);
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
        addTaskStatus: "success",
        addTaskError: "",
        getTasksStatus: "",
        getTasksError: "",
        deleteTaskStatus: "",
        deleteTaskError: "",
        updateTaskStatus: "",
        updateTaskError: "",
      };
    },
    [tasksAdd.rejected]: (state, action) => {
      return {
        ...state,
        addTaskStatus: "rejected",
        addTaskError: action.payload,
        getTasksStatus: "",
        getTasksError: "",
        deleteTaskStatus: "",
        deleteTaskError: "",
        updateTaskStatus: "",
        updateTaskError: "",
      };
    },
    [getTasks.pending]: (state, action) => {
      return {
        ...state,
        addTaskStatus: "",
        addTaskError: "",
        getTasksStatus: "pending",
        getTasksError: "",
        deleteTaskStatus: "",
        deleteTaskError: "",
        updateTaskStatus: "",
        updateTaskError: "",
      };
    },
    [getTasks.fulfilled]: (state, action) => {
      return {
        ...state,
        tasks: action.payload,
        addTaskStatus: "",
        addTaskError: "",
        getTasksStatus: "success",
        getTasksError: "",
        deleteTaskStatus: "",
        deleteTaskError: "",
        updateTaskStatus: "",
        updateTaskError: "",
      };
    },
    [getTasks.rejected]: (state, action) => {
      return {
        ...state,
        addTaskStatus: "",
        addTaskError: "",
        getTasksStatus: "rejected",
        getTasksError: action.payload,
        deleteTaskStatus: "",
        deleteTaskError: "",
        updateTaskStatus: "",
        updateTaskError: "",
      };
    },
    [deleteTask.pending]: (state, action) => {
      return {
        ...state,
        addTaskStatus: "",
        addTaskError: "",
        getTasksStatus: "",
        getTasksError: "",
        deleteTaskStatus: "pending",
        deleteTaskError: "",
        updateTaskStatus: "",
        updateTaskError: "",
      };
    },
    [deleteTask.fulfilled]: (state, action) => {
      const currentTasks = state.tasks.filter(
        (task) => task._id !== action.payload._id
      );
      return {
        ...state,
        tasks: currentTasks,
        addTaskStatus: "",
        addTaskError: "",
        getTasksStatus: "",
        getTasksError: "",
        deleteTaskStatus: "success",
        deleteTaskError: "",
        updateTaskStatus: "",
        updateTaskError: "",
      };
    },
    [deleteTask.rejected]: (state, action) => {
      state = {
        ...state,
        addTaskStatus: "",
        addTaskError: "",
        getTasksStatus: "",
        getTasksError: "",
        deleteTaskStatus: "rejected",
        deleteTaskError: action.payload,
        updateTaskStatus: "",
        updateTaskError: "",
      };
    },
    [updateTask.pending]: (state, action) => {
      return {
        ...state,
        addTaskStatus: "",
        addTaskError: "",
        getTasksStatus: "",
        getTasksError: "",
        deleteTaskStatus: "",
        deleteTaskError: "",
        updateTaskStatus: "pending",
        updateTaskError: "",
      };
    },
    [updateTask.fulfilled]: (state, action) => {
      const updatedTasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
      return {
        ...state,
        tasks: updatedTasks,
        addTaskStatus: "",
        addTaskError: "",
        getTasksStatus: "",
        getTasksError: "",
        deleteTaskStatus: "",
        deleteTaskError: "",
        updateTaskStatus: "success",
        updateTaskError: "",
      };
    },
    [updateTask.rejected]: (state, action) => {
      return {
        ...state,
        addTaskStatus: "",
        addTaskError: "",
        getTasksStatus: "",
        getTasksError: "",
        deleteTaskStatus: "",
        deleteTaskError: "",
        updateTaskStatus: "rejected",
        updateTaskError: action.payload,
      };
    },
  },
});

export default tasksSlice.reducer;