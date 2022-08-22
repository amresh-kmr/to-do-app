import { Formik, Form, ErrorMessage, useFormik } from "formik";
import React, { useState } from "react";
import Task from "./Task";
import { Meteor } from "meteor/meteor";

let initialValues = { task: "", date: getDate(new Date()) };

function getDate(date) {
  return (
    date.getFullYear() + "-" + 0 + (date.getMonth() + 1) + "-" + date.getDate()
  );
}

function TaskForm({ tasks }) {
  const [editId, setEditId] = useState(null);

  const handleSubmit = ({ task, date }, { setSubmitting, resetForm }) => {
    if (!editId) {
      Meteor.call("add-task", { text: task, createdAt: date }, (e, r) => {});
    } else {
      Meteor.call("update-task", { id: editId, text: task, createdAt: date });
      setEditId(null);
    }
    resetForm(initialValues);
    setSubmitting(false);
  };

  return (
    <div>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validate={(values) => {
          const errors = {};
          if (!values.task) {
            errors.task = "Please Fill the Form";
          }
          return errors;
        }}
      >
        {({ handleChange, isSubmitting, setFieldValue, values }) => (
          <>
            <Task
              task={tasks}
              setFieldValue={setFieldValue}
              setEditId={setEditId}
            />
            <hr />
            <Form>
              <textarea
                type="text"
                onChange={handleChange}
                name="task"
                value={values.task}
              />
              <ErrorMessage name="task" className="error" component="div" />

              <input
                type="date"
                name="date"
                onChange={handleChange}
                value={values.date}
              />
              <input
                type="submit"
                value={editId ? "update" : "create"}
                disabled={isSubmitting}
              />
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
