import { createSlice } from "@reduxjs/toolkit";

export  interface Cred {
    id: string, 
    name: string,
}

interface CredState {
    Cred : Cred[]
}

const initialState : CredState = {
    Cred : []
}

const credSlice = createSlice({
    name : 'cred',
    initialState,
    reducers : ()=>({ addItem: () => { } })
})

export const {addItem} = credSlice.actions

export default credSlice.reducer