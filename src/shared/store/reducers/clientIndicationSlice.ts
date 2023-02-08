import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { dataAllIndictions, dataOneIndication } from '../../models/indication';

const initialState: dataAllIndictions = {
    data: []
};

export const clientIndicationSlice = createSlice({
    name: "listaDeIndicacoes",
    initialState,
    reducers: {
        clearClientIndications: () => initialState,
        setClientIndications: (state, action: PayloadAction<dataOneIndication>) => {
            state.data.push(action.payload);
        },
        removeIndication: (state, action: PayloadAction<string>) => {
            const teste = state.data.filter(item => item.id !== action.payload);
            state.data = teste;
        }
    }
});

export const { setClientIndications, clearClientIndications, removeIndication } = clientIndicationSlice.actions;

export default clientIndicationSlice.reducer;