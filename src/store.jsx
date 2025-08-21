import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import countriesReducer from "./slices/countriesSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    countries: countriesReducer,
  },
});
export default store;
