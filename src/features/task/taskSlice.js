// import { CompareArrowsOutlined } from "@material-ui/icons";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  taskList: [],
  taskId: "",
  taskTitle: "",
  taskCompleted: "",
  taskDateAdded: "",
  taskDateModified: "",
  taskImportant: "",
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.taskList = action.payload;
      state.taskList.sort((a, b) => b.completed - a.completed);
      state.taskList.sort(function (x, y) {
        // false values first
        return x.completed === y.completed ? 0 : x.completed ? 1 : -1;
      });
      state.completedTaskList = state.taskList.filter(
        (a) => a.completed === true
      );
    },
    addTask: (state, action) => {
      state.taskList.unshift(action.payload);
      state.taskList.sort((a, b) => b.completed - a.completed);
      state.taskList.sort(function (x, y) {
        // false values first
        return x.completed === y.completed ? 0 : x.completed ? 1 : -1;
      });
    },
    updateTaskName: (state, action) => {
      state.taskTitle = action.payload;
      state.taskCompleted = false;
      state.taskImportant = false;
      state.taskDateAdded = Date().toLocaleString();
      state.taskDateModified = Date().toLocaleString();
      state.taskList.sort((a, b) => b.completed - a.completed);
      state.taskList.sort(function (x, y) {
        // false values first
        return x.completed === y.completed ? 0 : x.completed ? 1 : -1;
      });
    },
    updateTaskStatus: (state, action) => {
      const newTaskList = [...state.taskList];
      const index = newTaskList.findIndex(
        (obj) => obj.id === action.payload.id
      );
      newTaskList[index].completed = action.payload.completed;
      newTaskList[index].datemodified = Date().toLocaleString();
      state.taskList = newTaskList;
      state.taskList.sort((a, b) => b.completed - a.completed);
      state.taskList.sort(function (x, y) {
        // false values first
        return x.completed === y.completed ? 0 : x.completed ? 1 : -1;
      });
    },
    updateTaskTitle: (state, action) => {
      const newTaskList = [...state.taskList];
      const index = newTaskList.findIndex(
        (obj) => obj.id === action.payload.id
      );
      newTaskList[index].title = action.payload.title;
      newTaskList[index].datemodified = Date().toLocaleString();
      state.taskList = newTaskList;
      state.taskList.sort((a, b) => b.completed - a.completed);
      state.taskList.sort(function (x, y) {
        // false values first
        return x.completed === y.completed ? 0 : x.completed ? 1 : -1;
      });
    },
    updateTaskPriority: (state, action) => {
      const newTaskList = [...state.taskList];
      const index = newTaskList.findIndex(
        (obj) => obj.id === action.payload.id
      );
      newTaskList[index].important = action.payload.important;
      newTaskList[index].datemodified = Date().toLocaleString();
      state.taskList = newTaskList;
      state.taskList.sort((a, b) => b.completed - a.completed);
      state.taskList.sort(function (x, y) {
        // false values first
        return x.completed === y.completed ? 0 : x.completed ? 1 : -1;
      });
      console.log("imp state task update", state.taskList);
    },
    deleteStateTask: (state, action) => {
      const newTaskList = [...state.taskList];
      const index = action.payload.id;
      const filteredList = newTaskList.filter((item) => item.id !== index);
      state.taskList = filteredList;
    },
    getCompleted: (state, action) => {
      let newTaskList = [...state.taskList];
      newTaskList = newTaskList.filter((a) => a.completed === true);
      state.taskList = newTaskList;
    },
    getPending: (state, action) => {
      let newTaskList = [...state.taskList];
      newTaskList = newTaskList.filter((a) => a.completed === false);
      state.taskList = newTaskList;
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTaskName,
  updateTaskStatus,
  updateTaskTitle,
  updateTaskPriority,
  deleteStateTask,
  getCompleted,
  getPending,
} = taskSlice.actions;

export const selectTasks = (state) => state.tasks.taskList;
export const selectNewTask = (state) => {
  return {
    title: state.tasks.taskTitle,
    completed: state.tasks.taskCompleted,
    dateadded: state.tasks.taskDateAdded,
    datemodified: state.tasks.taskDateModified,
    important: state.tasks.taskImportant,
  };
};

export default taskSlice.reducer;
