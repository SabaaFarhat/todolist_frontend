import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./reducers/reducer";
import usersReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    tasksState: tasksReducer,
    usersState: usersReducer,    
  }
});

export default store;

// import { configureStore } from '@reduxjs/toolkit';
// import rootReducers from './reducers';
// import storage from 'redux-persist/lib/storage';
// import { persistReducer } from 'redux-persist';

// import thunk from 'redux-thunk';
// const persistConfig = {
//   key: 'root',
//   storage,
// };
// const persistedReducer = persistReducer(persistConfig, rootReducers);
// export default configureStore({
//   reducer: persistedReducer,
//   middleware: [thunk],
// });

