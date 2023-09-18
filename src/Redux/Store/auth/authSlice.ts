import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface AuthUser {
    auth: object | null
}

const initialState: AuthUser = {
    auth: {},
}


export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        userAuth: (state, {payload}:PayloadAction<object>):void => {
            state.auth = payload
            console.log(state.auth)
        },

    }

})


export const {userAuth} = authSlice.actions

export default authSlice.reducer