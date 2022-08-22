import React, { memo } from "react";
import { Meteor } from "meteor/meteor";

function getDate(date) {
  console.log(date.getFullYear());
  console.log(date.getTime().getFullYear());
  return (
    date.getFullYear() + "-" + 0 + (date.getMonth() + 1) + "-" + date.getDate()
  );
}

function Task({ task, setFieldValue, setEditId }) {
  const handleDelete = (id) => {
    Meteor.call("delete-task", id);
  };

  const handleEdit = (id) => {
    let temp = task.find((item) => item._id === id);
    setFieldValue("task", temp.task);
    setFieldValue("date", temp.date);
    setEditId(id);
  };

  return (
    <ol>
      {task.map((item, i) => (
        <li
          key={item._id}
          style={{
            marginTop: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "20px", flex: "2" }}>{item.task}</span>
            <span style={{ marginRight: "20px" }}>{item.createdAt}</span>
            <button onClick={() => handleEdit(item._id)}>Edit</button>
            <button
              style={{ marginLeft: "20px" }}
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ol>
  );
}

export default memo(Task);
