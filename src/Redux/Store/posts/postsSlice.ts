import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserPost } from '../../../types/typeSection';

interface Posts {
  posts: UserPost[] | null;
}
const initialState: Posts = {
  posts: null,
};
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    editPosts: (state, { payload }: PayloadAction<UserPost[] | null>) => {
      return {
        ...state,
        posts: payload,
      };
    },
  },
});

export const { editPosts } = postsSlice.actions;
export default postsSlice.reducer;
