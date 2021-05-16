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
            state.taskList.sort((a,b) => b.completed - a.completed);                      
            state.taskList.sort(function(x, y) {                
                // false values first
                return (x.completed === y.completed)? 0 : x.completed? 1 : -1;
            });                       
        },  
        addTask: (state, action) => {
            state.taskList.unshift(action.payload);
            state.taskList.sort((a,b) => b.completed - a.completed);   
            state.taskList.sort(function(x, y) {                
                // false values first
                return (x.completed === y.completed)? 0 : x.completed? 1 : -1;
            });           
        },
        updateTaskName:(state, action) => {            
            state.taskTitle = action.payload;
            state.taskCompleted = false;
            state.taskDateAdded = Date().toLocaleString();            
            state.taskList.sort((a,b) => b.completed - a.completed);   
            state.taskList.sort(function(x, y) {                
                // false values first
                return (x.completed === y.completed)? 0 : x.completed? 1 : -1;
            });
        },
        updateTaskStatus: (state, action) => {
            let newTaskList = [...state.taskList];            
            let index = newTaskList.findIndex((obj => obj.id === action.payload.id));
            newTaskList[index].completed = action.payload.completed;                                        
            state.taskList = newTaskList; 
            state.taskList.sort((a,b) => b.completed - a.completed);   
            state.taskList.sort(function(x, y) {                
                // false values first
                return (x.completed === y.completed)? 0 : x.completed? 1 : -1;
            });           
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