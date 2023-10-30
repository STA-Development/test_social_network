import { Post, UserPost } from '../types/typeSection';
import { editUserPost } from '../Service/User/RequestsForUsers';
import { editPosts } from '../Redux/Store/posts/postsSlice';
import { ToastNotifyError, ToastNotifySuccess } from '../Helpers';

interface Props {
  validationResult: boolean;
  postId: number;
  setLoading: (loading: boolean) => void;
  postData: Post;
  setPostData: (post: Post) => void;
  setBlur: (blur: boolean) => void;
  setNotDelete: (deleting: boolean) => void;
  notDelete: boolean;
  token: string;
  dispatch: Function;
}

const usePostEdit = async ({
  validationResult,
  postId,
  setLoading,
  postData,
  setPostData,
  setBlur,
  setNotDelete,
  notDelete,
  dispatch,
}: Props) => {
  if (validationResult) {
    const editFormData: FormData = new FormData();
    const data = JSON.stringify({
      title: postData.title,
      description: postData.description,
      delete: notDelete,
    });
    editFormData.append('data', data);
    if (postData.photo && postData.photo.files && postData.photo.files[0]) {
      editFormData.append('photo', postData.photo.files[0]);
    }
    try {
      setLoading(true);
      const editedPostResponse: UserPost[] = await editUserPost(
        postId,
        editFormData,
      );
      dispatch(editPosts(editedPostResponse));
      setPostData({
        title: '',
        description: '',
        photo: null,
      });
      setNotDelete(false);
      setLoading(false);
      setBlur(false);
      ToastNotifySuccess();
    } catch (error) {
      if (error instanceof Error) {
        setLoading(false);
        ToastNotifyError(error.message);
      }
    }
  } else {
    ToastNotifyError();
  }
};

export default usePostEdit;
