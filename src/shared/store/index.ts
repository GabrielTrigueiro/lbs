import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./reducers/clientSlice";

const store = configureStore({
    reducer: {
        client: clientSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;