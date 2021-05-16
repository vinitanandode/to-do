import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import notesSlice from '../features/notes/notesSlice';
import taskReducer from '../features/task/taskSlice';
import userReducer from '../features/user/userSlice';
import {loadState, saveState} from './localStorage'; 

const persistedState = loadState();
export const store = configureStore({
  persistedState,
  reducer: {
    tasks: taskReducer,
    user: userReducer,
    notes: notesSlice
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  })
});

store.subscribe(() =>{
  saveState(store.getState());
})

// import { createStore, applyMiddleware } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist' // imports from redux-persist
// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// import rootReducer from './reducers' // Root reducer

// const persistConfig = { // configuration object for redux-persist
//     key: 'root',
//     storage, // define which storage to use
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer) // create a persisted reducer

// const store = createStore(
//     persistReducer, // pass the persisted reducer instead of rootReducer to createStore
//     applyMiddleware() // add any middlewares here
// )

// const  persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

// export {store, persistor}