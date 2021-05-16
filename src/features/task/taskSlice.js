import { createSlice} from '@reduxjs/toolkit';

const initialState = {
    taskList: [],
    taskId: "",
    taskTitle: "",
    taskCompleted: "",
    taskDateAdded: ""
}

const taskSlice = createSlice({
    name:"tasks",
    initialState,
    reducers:{
        setTasks: (state, action) => {
            state.taskList = action.payload;
        },  
        addTask: (state, action) => {
            state.taskList.unshift(action.payload);              
        },
        updateTaskName:(state, action) => {            
            state.taskTitle = action.payload;
            state.taskCompleted = false;
            state.taskDateAdded = Date().toLocaleString();
        },
        updateTaskStatus: (state, action) => {
            let newTaskList = [...state.taskList];
            newTaskList[action.payload.id] = {...newTaskList[action.payload.id], completed: action.payload.completed};
            state.taskList = newTaskList;
        },
        deleteStateTask: (state, action) => {
            let newTaskList = [...state.taskList];
            let index = action.payload.id;
            newTaskList.splice(index,1);
            state.taskList = newTaskList;
        }
    }
})

export const {setTasks, addTask, updateTaskName, updateTaskStatus, deleteStateTask} = taskSlice.actions;

export const selectTasks = (state) => state.tasks.taskList;
export const selectNewTask = (state) => {
    return {        
        title: state.tasks.taskTitle,
        completed: state.tasks.taskCompleted,
        dateadded: state.tasks.taskDateAdded
    }
}

    

export default taskSlice.reducer;