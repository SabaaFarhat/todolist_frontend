import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getUserById } from '../redux/slices/userSlice';
import jwt from "jwt-decode";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SignIn = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    password: '',
  });

  const [login, setLogin] = useState(false);
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState(false);
  console.log("signIn", loginError)

  const connectedUser = useSelector((state) => state.usersState);
  console.log("useeeer", connectedUser);

  let token = localStorage.getItem('token');
  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('token') !== '') {
      localStorage.clear();
    }
  }, [login == false]);

  useEffect(() => {
    handleConnection();
  }, [connectedUser, token]);

  const handleConnection = () => {
    if (token && token !== '' && connectedUser) {
      let decreptedToken = jwt(token);
      const isValidUser =
        connectedUser &&
        connectedUser.id &&
        decreptedToken &&
        decreptedToken.sub &&
        connectedUser.id === decreptedToken.sub;
      if (isValidUser) {
        navigate('/tasks');
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'userName') {
      setUser((prevState) => {
        return { ...prevState, userName: value };
      });
    } else if (name === 'password') {
      setUser((prevState) => {
        return { ...prevState, password: value };
      });
    }
  };

  const validate = (data) => {
    let errors = {};

    if (!data.userName) {
      errors.userName = 'user Name is required.';
    }
    if (!data.password) {
      errors.password = 'Password is required.';
    }
    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //authService.signIn(user);

    if (user.userName && user.password) {
      return await axios
        .post('http://localhost:5000/auth/login', user, {})
        .then((res) => {
          console.log('🚀 ~ file: SignIn.js ~ line 73 ~ .then ~ res', res);
          console.log(setLogin(true));
          setLogin(true);
          localStorage.setItem('token', res.data.tokens.access.token);
          console.log(res.data.user.id);
          dispatch(getUserById(res.data.user.id));
        })
        .catch((err) => {
          console.log(err);
          setLoginError(true);
          console.log(
            '🚀 ~ file: SignIn.jsx ~ line 35 ~ SignInSide ~ loginError',
            loginError
          );
        });
    }
  };

  return (
    <div className="flex align-items-center justify-content-center">
      <div className="surface-card p-4 shadow-2 border-round w-full lg:w-6">
        <div className="text-center mb-5">
          <div className="text-900 text-3xl font-medium mb-3">Welcome Back</div>
          <span className="text-600 font-medium line-height-3">
            Don't have an account?
          </span>
          <a
            href="/users/signup"
            className="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          >
            Create today!
          </a>
        </div>

        <div>
          <label htmlFor="userName" className="block text-900 font-medium mb-2">
            User Name
          </label>
          <InputText
            id="userName"
            name="userName"
            type="text"
            className="w-full mb-3"
            onChange={handleChange}
          />

          <label htmlFor="password" className="block text-900 font-medium mb-2">
            Password
          </label>
          <InputText
            id="password"
            name="password"
            type="password"
            className="w-full mb-3"
            onChange={handleChange}
          />

          <div className="flex align-items-center justify-content-between mb-6">
            <div className="flex align-items-center">
              <Checkbox
                id="rememberme"
                // onChange={e => setChecked(e.checked)} checked={checked}
                className="mr-2"
              />
              <label htmlFor="rememberme">Remember me</label>
            </div>
            <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">
              Forgot your password?
            </a>
          </div>

          <Button
            label="Sign In"
            icon="pi pi-user"
            className="w-full"
            onClick={onSubmit}
          />
        </div>
      </div>
      <Snackbar
              open={loginError}
              autoHideDuration={6000}
              onClose={() => setLoginError(false)}
            >
              <Alert
                onClose={() => setLoginError(false)}
                severity="error"
                sx={{ width: "100%" }}
              >
                UserName or password is incorrect !! Please verify your data
              </Alert>
            </Snackbar>
    </div>

  );
};

export default SignIn;
