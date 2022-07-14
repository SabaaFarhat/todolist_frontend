import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';
import { useNavigate, useParams } from 'react-router-dom';
import { classNames } from 'primereact/utils';

import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTaskById, updateTask } from '../redux/slices/taskSlice';

export const UpdateTask = () => {
  const dispatch = useDispatch();
  const tasksState = useSelector((state) => state.tasksState.tasks);
  const { id } = useParams();

  let navigate = useNavigate();

  const [task, setTask] = useState({
    taskName: '',
    Duration: '',
    startedDate: null,
    finishedDate: null,
    completed: false,
  });

  // console.log('task.id', id);
  // console.log('tasksState', tasksState);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    if (name === 'taskName') {
      setTask((prevState) => {
        return { ...prevState, taskName: value };
      });
    } else if (name === 'Duration') {
      setTask((prevState) => {
        return { ...prevState, Duration: value };
      });
    } else if (name === 'startedDate') {
      setTask((prevState) => {
        return { ...prevState, startedDate: value };
      });
    } else if (name === 'finishedDate') {
      setTask((prevState) => {
        return { ...prevState, finishedDate: value };
      });
    } else if (name === 'completed') {
      setTask((prevState) => {
        return { ...prevState, completed: value };
      });
    }
  };

  useEffect(() => {
    dispatch(getTaskById(id));
  }, [dispatch]);

  const validate = (data) => {
    let errors = {};

    if (!data.name) {
      errors.name = 'Name is required.';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('task.______id', task);
    dispatch(updateTask(task, id));
    // navigate('/tasks');
  };

  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return (
      isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>
    );
  };

  return (
    <div className="form-demo">
      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Update Task</h5>
          <Form
            onSubmit={handleChange}
            validate={validate}
            render={() => (
              <form className="p-fluid">
                <Field
                  name="taskName"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="taskName"
                          name="taskName"
                          autoFocus
                          className={classNames({
                            'p-invalid': isFormFieldValid(meta),
                          })}
                          onChange={handleChange}
                          value={task.taskName}
                        />
                        <label
                          htmlFor="taskName"
                          className={classNames({
                            'p-error': isFormFieldValid(meta),
                          })}
                        >
                          Task Name*
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="Duration"
                  render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <InputText
                          id="Duration"
                          name="Duration"
                          autoFocus
                          className={classNames({
                            'p-invalid': isFormFieldValid(meta),
                          })}
                          onChange={handleChange}
                        />
                        <label
                          htmlFor="Duration"
                          className={classNames({
                            'p-error': isFormFieldValid(meta),
                          })}
                        >
                          Duration
                        </label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )}
                />
                <Field
                  name="startedDate"
                  render={({ input }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Calendar
                          id="startedDate"
                          name="startedDate"
                          dateFormat="dd/mm/yy"
                          mask="99/99/9999"
                          showIcon
                          onChange={handleChange}
                        />
                        <label htmlFor="startedDate">started Date*</label>
                      </span>
                    </div>
                  )}
                />
                <Field
                  name="finishedDate"
                  render={({ input }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Calendar
                          id="finishedDate"
                          name="finishedDate"
                          dateFormat="dd/mm/yy"
                          mask="99/99/9999"
                          showIcon
                          onChange={handleChange}
                        />
                        <label htmlFor="finishedDate">finished Date*</label>
                      </span>
                    </div>
                  )}
                />
                <Field
                  type="checkbox"
                  name="completed"
                  render={({ input, meta }) => (
                    <div className="field-checkbox">
                      <Checkbox
                        inputId="completed"
                        name="completed"
                        className={classNames({
                          'p-invalid': isFormFieldValid(meta),
                        })}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="completed"
                        className={classNames({
                          'p-error': isFormFieldValid(meta),
                        })}
                      >
                        Completed
                      </label>
                    </div>
                  )}
                />

                <Button
                  type="submit"
                  label="Submit"
                  className="mt-2"
                  onClick={handleSubmit}
                />
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default UpdateTask;
