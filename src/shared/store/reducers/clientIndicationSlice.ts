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

export const clientIndicationSlice = createSlice({
    name: "listaDeIndicacoes",
    initialState,
    reducers: {
        setClientIndications: (state, action: PayloadAction<dataOneIndication>) => {
            state.data.push(action.payload);
            console.log("indicações Cliente: " + state.data);
        },
        clearClientIndications: () => initialState,
    }
});

export const { setClientIndications, clearClientIndications } = clientIndicationSlice.actions;

export default clientIndicationSlice.reducer;