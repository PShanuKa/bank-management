import { createSlice } from "@reduxjs/toolkit";

const userInfoFromStorage = localStorage.getItem("userInfo");
const initialState: any = {
    userInfo: userInfoFromStorage ? JSON.parse(userInfoFromStorage) : null,
};


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            if (action.payload) {
                localStorage.setItem("userInfo", JSON.stringify(action.payload.userInfo));
                localStorage.setItem("Bearer", (action.payload.token));
                state.userInfo = action.payload.userInfo;
            }else{
                localStorage.removeItem("userInfo");
                localStorage.removeItem("Bearer");
                state.userInfo = null;
            }
        },
        logOut: (state) => {
            localStorage.removeItem("userInfo");
            localStorage.removeItem("Bearer");
            state.userInfo = null;
        },
    }
})

export const { setUser, logOut } = authSlice.actions

export default authSlice.reducer