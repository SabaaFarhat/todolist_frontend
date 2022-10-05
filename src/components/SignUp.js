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
import '../App.css';
import { userService } from '../services/userService';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../assets/LandingPage';
import logo from '../assets/todoicon.jpg';
import { useAppContext } from '../context/appContext';
import { FormRow, Alert } from './';

const initialState = {
  userName: '',
  email: '',
  password: '',
  isMember: true,
  birthdate: null,
};

export const SignUp = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  //global state
  const { user, isLoading, showAlert, displayAlert, registerUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  const onSubmit = (e) => {
    //   e.preventDefault();
    //   if(user.userName && user.email && user.password && user.birthdate){
    //       userService.signUp(user);
    //       navigate("/tasks");
    //   }
    // };
    e.preventDefault();
    const { userName, email, password, isMember } = values;
    if (!email || !password || (!isMember && !userName)) {
      displayAlert();
      return;
    }

    const currentUser = { userName, email, password };
    if (isMember) {
      // setupUser({
      //   currentUser,
      //   endPoint: 'login',
      //   alertText: 'Login Successful! Redirecting...',
      // });
      console.log('already...');
    } else {
      // setupUser({
      //   currentUser,
      //   endPoint: 'register',
      //   alertText: 'User Created! Redirecting...',
      // });
      registerUser(currentUser);

      
    }
  };

  useEffect(() => {
    if (user) {
      // setTimeout(() => {
      //   navigate('/tasks');
      // }, 3000);
      navigate('/tasks');
    }
  }, [user]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <nav>
          <img src={logo} alt="jobify" className="logo" />
          <span>ToDoList</span>
        </nav>
        <h3>{values.isMember ? 'Login' : 'Register'}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="userName"
            value={values.userName}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </Wrapper>
  );

  //   <div className="form-demo">
  //     <Dialog
  //       visible={showMessage}
  //       onHide={() => setShowMessage(false)}
  //       position="top"
  //       footer={dialogFooter}
  //       showHeader={false}
  //       breakpoints={{ '960px': '80vw' }}
  //       style={{ width: '30vw' }}
  //     >
  //       <div className="flex align-items-center flex-column pt-6 px-3">
  //         <i
  //           className="pi pi-check-circle"
  //           style={{ fontSize: '5rem', color: 'var(--green-500)' }}
  //         ></i>
  //         <h5>Registration Successful!</h5>
  //         <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>
  //           Your account is registered under name <b>{user.userName}</b> ; it'll
  //           be valid next 30 days without activation. Please check{' '}
  //           <b>{user.email}</b> for activation instructions.
  //         </p>
  //       </div>
  //     </Dialog>

  //     <div className="flex justify-content-center">
  //       <div className="card">
  //         <h5 className="text-center">Sign Up</h5>
  //         <Form
  //           onSubmit={onSubmit}
  //           initialValues={{ userName: '', email: '', password: '' , birthdate: ''}}
  //           validate={validate}
  //           render={({ handleSubmit }) => (
  //             <form onSubmit={handleSubmit} className="p-fluid">
  //               <Field
  //                 name="name"
  //                 render={({ input, meta }) => (
  //                   <div className="field">
  //                     <span className="p-float-label">
  //                       <InputText
  //                         id="userName"
  //                         name='userName'
  //                         autoFocus
  //                         className={classNames({
  //                           'p-invalid': isFormFieldValid(meta),
  //                         })}
  //                         onChange={handleChange}
  //                       />
  //                       <label
  //                         htmlFor="userName"
  //                         className={classNames({
  //                           'p-error': isFormFieldValid(meta),
  //                         })}
  //                       >
  //                         User Name*
  //                       </label>
  //                     </span>
  //                     {getFormErrorMessage(meta)}
  //                   </div>
  //                 )}
  //               />
  //               <Field
  //                 name="email"
  //                 render={({ input, meta }) => (
  //                   <div className="field">
  //                     <span className="p-float-label p-input-icon-right">
  //                       <i className="pi pi-envelope" />
  //                       <InputText
  //                         id="email"
  //                         name="email"
  //                         className={classNames({
  //                           'p-invalid': isFormFieldValid(meta),
  //                         })}
  //                         onChange={handleChange}
  //                       />
  //                       <label
  //                         htmlFor="email"
  //                         className={classNames({
  //                           'p-error': isFormFieldValid(meta),
  //                         })}
  //                       >
  //                         Email*
  //                       </label>
  //                     </span>
  //                     {getFormErrorMessage(meta)}
  //                   </div>
  //                 )}
  //               />
  //               <Field
  //                 name="password"
  //                 render={({ input, meta }) => (
  //                   <div className="field">
  //                     <span className="p-float-label">
  //                       <Password
  //                         id="password"
  //                         toggleMask
  //                         name="password"
  //                         className={classNames({
  //                           'p-invalid': isFormFieldValid(meta),
  //                         })}
  //                         header={passwordHeader}
  //                         footer={passwordFooter}
  //                         onChange={handleChange}
  //                       />
  //                       <label
  //                         htmlFor="password"
  //                         className={classNames({
  //                           'p-error': isFormFieldValid(meta),
  //                         })}
  //                       >
  //                         Password*
  //                       </label>
  //                     </span>
  //                     {getFormErrorMessage(meta)}
  //                   </div>
  //                 )}
  //               />
  //               <Field
  //                 name="birthdate"
  //                 render={({ input }) => (
  //                   <div className="field">
  //                     <span className="p-float-label">
  //                       <Calendar
  //                       name="birthdate"
  //                         id="birthdate"
  //                         dateFormat="dd/mm/yy"
  //                         mask="99/99/9999"
  //                         showIcon
  //                         onChange={handleChange}
  //                       />
  //                       <label htmlFor="date">Birthday</label>
  //                     </span>
  //                   </div>
  //                 )}
  //               />

  //               <Button type="submit" label="Submit" className="mt-2" onClick={onSubmit}/>
  //             </form>
  //           )}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default SignUp;
