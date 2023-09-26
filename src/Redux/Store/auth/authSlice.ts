import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../../types/typeSection";

interface AuthUser {
    auth: User | null
}

const initialState: AuthUser = {
    auth: {
        uId: '',
        name: '',
        email: '',
        picture: undefined
    },
}


export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        userAuth: (state, {payload}:PayloadAction<User>):void => {
            state.auth = payload
        },
        userLogOut: state => {
            state.auth = null
        }
    }

})


export const {userAuth,userLogOut} = authSlice.actions

export default authSlice.reducer