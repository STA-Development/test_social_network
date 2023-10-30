import { User, UserPost } from '../../types/typeSection';
import http from '../../api/httpService';

// * ___________-NEWS PAGE POSTS-___________
export const getPostsForNewsPage = async (): Promise<UserPost[]> => {
  const { data } = await http.get('/post/newsPagePosts');
  return data;
};
export const addNextPostsForNewsPage = async (
  length: number,
): Promise<UserPost[]> => {
  const { data } = await http.get(`/post/newsPagePosts/${length}`);
  return data;
};
export const allPostsLength = async () => {
  const { data } = await http.get('/post/length');
  return data;
};
// * ___________-NEWS PAGE POSTS-___________

// * ___________-USER POSTS-___________

export const getCurrentUserPosts = async (
  user: User | null,
): Promise<UserPost[]> => {
  const { data } = await http.get(`/post/userPosts/${user?.uId}`);
  return data;
};
export const addNextUserPosts = async (length: number): Promise<UserPost[]> => {
  const { data } = await http.get(`/post/nextUserPosts/${length}`);
  return data;
};
export const allUserPostsLength = async () => {
  const { data } = await http.get('/post/userPostsLength');
  return data;
};
export const createPost = async (
  postFormData: FormData,
  token: string,
): Promise<UserPost[]> => {
  const { data } = await http.post('/post', postFormData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const editUserPost = async (
  postId: number,
  editFormData: FormData,
): Promise<UserPost[]> => {
  const { data } = await http.patch(`/post/edit/${postId}`, editFormData);
  return data;
};

export const deleteUserPost = async (postId: number): Promise<UserPost[]> => {
  const { data } = await http.delete(`/post/delete/${postId}`);
  return data;
};
// * ___________-USER POSTS-___________

// * ___________-COMMENTS-___________

export const addComment = async (comment: string, postId: number) => {
  const { data } = await http.post('/comment/Add', { comment, postId });
  return data;
};

export const getComments = async (postId: number) => {
  const { data } = await http.get(`comment/${postId}`);
  return data;
};

// * ___________-COMMENTS-___________

// * ___________-USER PROFILE-___________
export const changeUserAvatar = async (file: FormData) => {
  const { data } = await http.patch('user/changeAvatar', file);
  return data;
};
// * ___________-USER PROFILE-___________
