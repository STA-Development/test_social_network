import { User, UserPost } from '../../types/typeSection';
import http from '../../api/httpService';

export const getAllPosts = async (): Promise<UserPost[]> => {
  const { data } = await http.get('/post/getAllPosts');
  return data;
};

export const allPostsLength = async () => {
  const { data } = await http.get('/post/getAllPostsLength');
  return data;
};
export const allUserPostsLength = async (token: string) => {
  const { data } = await http.get('/post/getAllUserPostsLength', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getCurrentUserPosts = async (
  user: User | null,
  token: string,
): Promise<UserPost[]> => {
  const { data } = await http.get(`/post/user/${user?.uId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
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

export const addNextTenPosts = async (length: number): Promise<UserPost[]> => {
  const { data } = await http.get(`/post/getAllPosts/${length}`);
  return data;
};

export const addUserNextTenPosts = async (
  length: number,
  token: string,
): Promise<UserPost[]> => {
  const { data } = await http.get(`/post/getUserAllPosts/${length}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const editUserPost = async (
  postId: number,
  editFormData: FormData,
  token: string,
): Promise<[UserPost[], string]> => {
  const { data } = await http.patch(`/post/edit/${postId}`, editFormData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'multipart/form-data',
    },
  });
  return data;
};

export const deleteUserPost = async (
  postId: number,
  token: string,
): Promise<UserPost[]> => {
  const { data } = await http.delete(`/post/delete/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const addComment = async (
  comment: string,
  postId: number,
  token: string,
) => {
  const { data } = await http.post(
    '/comment/addComment',
    { comment, postId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return data;
};

export const getComments = async (postId: number) => {
  const { data } = await http.get(`comment/getAll/${postId}`);
  return data;
};
