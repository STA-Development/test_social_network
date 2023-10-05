import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Post, User, UserPost} from "../../../types/typeSection";

interface Posts {
    posts: UserPost[] | null
}
const initialState:Posts = {
    posts:null
}
export const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers: {
        editPosts:(state,{payload}:PayloadAction<UserPost[] | null>) =>{
            console.log(state.posts)
            state.posts = payload
        }
    }
})

export const {editPosts} = postsSlice.actions
export default postsSlice.reducer