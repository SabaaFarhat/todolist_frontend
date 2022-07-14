import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';
import '../App.css';
import { userService } from '../services/userService';
import { Navigate, useNavigate } from 'react-router-dom';

export const SignUp = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  let navigate = useNavigate();

  const [user, setUser] = useState({
    userName: '',
    birthdate: null,
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'userName') {
      setUser((prevState) => {
        return { ...prevState, userName: value };
      });
    } else if (name === 'email') {
      setUser((prevState) => {
        return { ...prevState, email: value };
      });
    } else if (name === 'password') {
      setUser((prevState) => {
        return { ...prevState, password: value };
      });
    } else if (name === 'birthdate') {
      setUser((prevState) => {
        return { ...prevState, birthdate: value };
      });
    }
  };

  const validate = (data) => {
    let errors = {};

    if (!data.userName) {
      errors.userName = 'user Name is required.';
    }

    if (!data.email) {
      errors.email = 'Email is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
      errors.email = 'Invalid email address. E.g. example@email.com';
    }

    if (!data.password) {
      errors.password = 'Password is required.';
    }
    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(user.userName && user.email && user.password && user.birthdate){
        userService.signUp(user);
        navigate("/tasks");
    }
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  );
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );

  return (
    <div className="form-demo">
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ '960px': '80vw' }}
        style={{ width: '30vw' }}
      >
        <div className="flex align-items-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: '5rem', color: 'var(--green-500)' }}
          ></i>
          <h5>Registration Successful!</h5>
          <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
            Your account is registered under name <b>{user.userName}</b> ; it'll
            be valid next 30 days without activation. Please check{' '}
            <b>{user.email}</b> for activation instructions.
          </p>
        </div>
      </Dialog>

      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Sign Up</h5>
          <Form
            onSubmit={onSubmit}
            initialValues={{ userName: '', email: '', password: '' , birthdate: ''}}
            validate={validate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit} className="p-fluid">
                <Field
                  name="name"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="userName"
                          name='userName'
                          autoFocus
                          className={classNames({
                            'p-invalid': isFormFieldValid(meta),
                          })}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="userName"
                          className={classNames({
                            'p-error': isFormFieldValid(meta),
                          })}
                        >
                          User Name*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="email"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label p-input-icon-right">
                        <i className="pi pi-envelope" />
                        <InputText
                          id="email"
                          name="email"
                          className={classNames({
                            'p-invalid': isFormFieldValid(meta),
                          })}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="email"
                          className={classNames({
                            'p-error': isFormFieldValid(meta),
                          })}
                        >
                          Email*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="password"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Password
                          id="password"
                          toggleMask
                          name="password"
                          className={classNames({
                            'p-invalid': isFormFieldValid(meta),
                          })}
                          header={passwordHeader}
                          footer={passwordFooter}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="password"
                          className={classNames({
                            'p-error': isFormFieldValid(meta),
                          })}
                        >
                          Password*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="birthdate"
                  render={({ input }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Calendar
                        name="birthdate"
                          id="birthdate"
                          dateFormat="dd/mm/yy"
                          mask="99/99/9999"
                          showIcon
                          onChange={handleChange}
                        />
                        <label htmlFor="date">Birthday</label>
                      </span>
                    </div>
                  )}
                />

                <Button type="submit" label="Submit" className="mt-2" onClick={onSubmit}/>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
