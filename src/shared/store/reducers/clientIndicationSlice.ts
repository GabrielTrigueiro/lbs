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
        clearClientIndications: () => initialState,
        setClientIndications: (state, action: PayloadAction<dataOneIndication>) => {
            state.data.push(action.payload);
        },
        removeIndication: (state, action: PayloadAction<string>) => {
            const teste = state.data.filter(item => item.id !== action.payload);
            state.data = teste;
            console.log(state.data)
        }
    }
});

export const { setClientIndications, clearClientIndications, removeIndication } = clientIndicationSlice.actions;

export default clientIndicationSlice.reducer;