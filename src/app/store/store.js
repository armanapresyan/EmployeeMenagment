// store.js
import { configureStore } from "@reduxjs/toolkit";
import  crudReducer  from "../feature/crudSlice";

const store = configureStore({
  reducer: {
    crud: crudReducer,
  },
});

export default store;
