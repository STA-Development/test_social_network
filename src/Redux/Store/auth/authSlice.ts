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
        },
        userLogOut: state => {
            state.auth = null
        }
    }

})


export const {userAuth,userLogOut} = authSlice.actions

export default authSlice.reducer