import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  photo: "",
  password: "",
  confirmPassword: "",
  isError: false,
  errorMesssage: "",
  errors: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLogin: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.photo = action.payload.photo;
    },
    setUserName: (state, action) => {
      state.name = action.payload.name;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload.email;
    },
    setUserPassword: (state, action) => {
      state.password = action.payload.password;
    },
    setUserConfirmPassword: (state, action) => {
      state.confirmPassword = action.payload.confirmPassword;
    },
    setUserPhoto: (state, action) => {
      state.photo = action.payload.photo;
    },
    setErrors: (state, action) => {
      const newErrors = state.errors;
      let isNewError = state.isError;
      newErrors[action.payload.field] = action.payload.errorMessage;
      isNewError = true;
      state.errors = newErrors;
      state.isError = isNewError;
    },
    ClearErrors: (state) => {
      let newErrors = state.errors;
      let isNewError = state.isError;
      newErrors = {};
      isNewError = false;
      state.errors = newErrors;
      state.isError = isNewError;
    },
    setSignOut: (state) => {
      state.name = "";
      state.email = "";
      state.photo = "";
    },
  },
});

export const {
  setUserLogin,
  setSignOut,
  setUserName,
  setUserEmail,
  setUserPhoto,
  setUserPassword,
  setUserConfirmPassword,
  setErrors,
  ClearErrors,
} = userSlice.actions;

export const selectUserName = (state) => state.user.name;
export const selectEmail = (state) => state.user.email;
export const selectPassword = (state) => state.user.password;
export const selectConfirmPassword = (state) => state.user.confirmPassword;
export const selectPhoto = (state) => state.user.photo;
export const selectIsError = (state) => state.user.isError;
export const selectErrors = (state) => state.user.errors;

export default userSlice.reducer;
