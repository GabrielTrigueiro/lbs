import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface dataOneIndication {
    description: string,
    id: string,
    type: string,
}

interface dataAllIndictions {
    data: dataOneIndication[]
};

const initialState: dataAllIndictions = {
    data: []
};

export const indicationSlice = createSlice({
    name: "listaDeIndicacoes",
    initialState,
    reducers: {
        setAllIndicacoes: (state, action: PayloadAction<dataOneIndication[]>) => {
            state.data = action.payload;
            console.log(state.data);
        }
    }
});

export const { setAllIndicacoes } = indicationSlice.actions;

export default indicationSlice.reducer;