import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { dataAllIndications, dataOneIndication } from '../../models/indication';

const initialState: dataAllIndications = {
    data: []
};

export const indicationSlice = createSlice({
    name: "listaDeIndicacoes",
    initialState,
    reducers: {
        setAllIndicacoes: (state, action: PayloadAction<dataOneIndication[]>) => {
            state.data = action.payload;
        },
        resetIndicacao: () => initialState,
    }
});

export const { setAllIndicacoes, resetIndicacao } = indicationSlice.actions;

export default indicationSlice.reducer;