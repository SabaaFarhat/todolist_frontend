import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, getUserById, getUsers, usersAdd, updateUser } from "../slices/userSlice";

const initialState = {
  users: [],
  addUserStatus: "",
  addUserError: "",
  getUsersStatus: "",
  getUsersError: "",
  deleteUserStatus: "",
  deleteUserError: "",
  updateUserStatus: "",
  updateUserError: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [usersAdd.fulfilled]: (state, action) => {
      // state.users.push(action.payload);
      return {
        ...state,
        users: [action.payload, ...state.users],
        addUserStatus: "success",
        
      };
    },
    [usersAdd.rejected]: (state, action) => {
      return {
        ...state,
        addUserStatus: "rejected",
        addUserError: action.payload,
      };
    },
    [getUsers.fulfilled]: (state, action) => {
      return {
        ...state,
        users: action.payload,
        getUsersStatus: "success",
      };
    },
    [getUsers.rejected]: (state, action) => {
      return {
        ...state,
        getUsersStatus: "rejected",
        getUsersError: action.payload,
      };
    },
    [deleteUser.fulfilled]: (state, action) => {
      const currentUsers = state.users.filter(
        (user) => user._id !== action.payload._id
      );
      return {
        ...state,
        users: currentUsers,
        deleteUserStatus: "success",
      };
    },
    [deleteUser.rejected]: (state, action) => {
      state = {
        ...state,
        deleteUserStatus: "rejected",
        deleteUserError: action.payload,
      };
    },
    [updateUser.fulfilled]: (state, action) => {
      const updatedUsers = state.users.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
      return {
        ...state,
        users: updatedUsers,
        updateUserStatus: "success",
      };
    },
    [updateUser.rejected]: (state, action) => {
      return {
        ...state,
        updateUserStatus: "rejected",
        updateUserError: action.payload,
      };
    },
    [getUserById.fulfilled]: (state, action) => {
      const user = state.users.filter(
        (user) => user._id !== action.payload._id
      );
      return {
        ...state,
        users: user,
        getUsersStatus: "success",
      };
    },
    [getUserById.rejected]: (state, action) => {
      return {
        ...state,
        getUsersStatus: "rejected",
        getUsersError: action.payload,
      };
    },
  },
});

export default usersSlice.reducer;