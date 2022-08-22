import { TaskCollection } from "../db/TaskCollection";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

Meteor.methods({
  "add-task"({ text, createdAt }) {
    check(text, String);
    TaskCollection.insert({ task: text, createdAt });
  },

  "delete-task"(id) {
    TaskCollection.remove(id);
  },

  "update-task"({ id, text, createdAt }) {
    TaskCollection.update({ _id: id }, { task: text, createdAt: createdAt });
  },
});
