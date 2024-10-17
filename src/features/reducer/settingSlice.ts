import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    interestRate : 40
};


export const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        setSetting: (state, action) => {
            if (action.payload) {
                state.interestRate = action.payload.interestRate;
            }
        },
    }
})

export const { setSetting } = settingSlice.actions

export default settingSlice.reducer