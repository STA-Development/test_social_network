import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import postsReducer from './posts/postsSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		posts: postsReducer
	}
});


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
