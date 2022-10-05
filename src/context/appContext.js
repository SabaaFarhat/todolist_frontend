import axios from 'axios';
import React, { useReducer, useContext } from 'react';
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
} from './actions';
import reducer from './reducer';

const token = localStorage.getItem('token')
const user = localStorage.getItem('userLS')


const initialState = {
  isLoading: false,
  showAlert: false,
  user: user ? JSON.parse(user) : null,
  token: token,
  alertText: '',
  alertType: '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };


  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const registerUser = async (currentUser) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try {
      const response = await axios.post(
        'http://localhost:5000/users/createUser',
        currentUser
      );
      console.log(response);
      const { user, token } = response.data;
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token},
      });
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { message: error.response.data.message },
      })
    }
    clearAlert()
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
