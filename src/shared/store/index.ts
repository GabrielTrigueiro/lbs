import { configureStore } from "@reduxjs/toolkit";
import clientSlice from "./reducers/clientSlice";
import indicationSlice from "./reducers/indicationSlice";
import clientIndicationSlice from "./reducers/clientIndicationSlice";

const store = configureStore({
    reducer: {
        client: clientSlice,
        clientIndication: clientIndicationSlice,
        indicacoes: indicationSlice
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;