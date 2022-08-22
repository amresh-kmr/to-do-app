import { Meteor } from "meteor/meteor";
import { TaskCollection } from "/imports/db/TaskCollection";
import "../imports/api/todomethods";
import "../imports/api/todopublish";
// function insertTask(taskText) {
//   console.log(taskText);
//   TaskCollection.insert({ task: taskText, date: new Date() });
// }

// Meteor.publish("add-task", function (data) {
//   console.log(data);
// });

Meteor.startup(() => {
  if (TaskCollection.find().count() === 0) {
    // [
    //   "First Task",
    //   "Second Task",
    //   "Third Task",
    //   "Fourth Task",
    //   "Fifth Task",
    //   "Sixth Task",
    //   "Seventh Task",
    //   "Eighth Task",
    // ].forEach((item) => insertTask(item));
  }
});
