import { IInfoClient } from "../../models/client"
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from ".."


interface listaDeClientes {
    lista: IInfoClient[]
};

const initialState: listaDeClientes = {
    lista: []
};

export const clientSlice = createSlice({
    name: "listaCliente",
    initialState,
    reducers: {
        getClient: (state, action: PayloadAction<IInfoClient[]>) => {
            if (state.lista.length == 0){
                state.lista.push(...action.payload);
            }
        }
    }
});

export const { getClient } = clientSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.client.lista;

export default clientSlice.reducer;