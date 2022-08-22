import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { TaskCollection } from "/imports/db/TaskCollection";
import TaskForm from "./Form.jsx";

export const App = () => {
  const { tasks, isLoading } = useTracker(() => {
    const handler = Meteor.subscribe("get-tasks");

    if (!handler.ready()) return { isLoading: true };
    let tasks = TaskCollection.find().fetch();

    return { tasks };
  });

  return (
    <div>
      <h1>To Do App:</h1>
      <hr />
      {isLoading ? <h1>Loading...</h1> : <TaskForm tasks={tasks} />}
    </div>
  );
};
