import { Meteor } from "meteor/meteor";
import { TaskCollection } from "../db/TaskCollection";

Meteor.publish("get-tasks", function getTasks() {
  return TaskCollection.find({});
});
