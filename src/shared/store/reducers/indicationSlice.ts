import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { dataAllIndictions, dataOneIndication } from '../../models/indication';

const initialState: dataAllIndictions = {
    data: []
};

export const indicationSlice = createSlice({
    name: "listaDeIndicacoes",
    initialState,
    reducers: {
        setAllIndicacoes: (state, action: PayloadAction<dataOneIndication[]>) => {
            state.data = action.payload;
            // console.log(state.data);
        }
    }
});

export const { setAllIndicacoes } = indicationSlice.actions;

export default indicationSlice.reducer;