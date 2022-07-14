import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

const SignIn = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    userName: '',
    password: '',
  });

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

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.userName && user.password) {
      authService.signIn(user);
      navigate('/tasks');
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
    </div>
  );
};

export default SignIn;
