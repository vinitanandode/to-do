import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    notesList: [],
    noteId: "",
    noteTitle: "",    
    noteDateAdded: ""
}

const notesSlice = createSlice({
    name:"notes",
    initialState,
    reducers:{
        setNotes: (state, action) => {
            state.notesList = action.payload;
        },  
        // addNote: (state, action) => {
        //     state.notesList.unshift(action.payload);              
        // },
        // updateNote:(state, action) => {            
        //     state.taskTitle = action.payload;
        //     state.taskCompleted = false;
        //     state.taskDateAdded = Date().toLocaleString();
        // },        
    }
})

export const {setNotes} = notesSlice.actions;

export const selectNotes = (state) => state.notes.notesList;

export default notesSlice.reducer;