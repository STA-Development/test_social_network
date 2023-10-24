import { Post, UserPost } from '../types/typeSection';
import { editUserPost } from '../Service/User/RequestsForUsers';
import { editPosts } from '../Redux/Store/posts/postsSlice';
import deleteImage from '../Service/firebase/fileStorage';
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
  token,
  dispatch,
}: Props) => {
  if (validationResult) {
    const editFormData: FormData = new FormData();
    editFormData.append('title', postData.title);
    editFormData.append('description', postData.description);
    if (postData.photo && postData.photo.files && postData.photo.files[0]) {
      editFormData.append('photo', postData.photo.files[0]);
    }
    editFormData.append('delete', String(notDelete));
    try {
      setLoading(true);
      const editedPostResponse: [UserPost[], string] = await editUserPost(
        postId,
        editFormData,
        token,
      );
      const allPosts: UserPost[] = editedPostResponse[0];
      dispatch(editPosts(allPosts));
      if (editedPostResponse[1] && notDelete) {
        await deleteImage(editedPostResponse[1].split('/')[7].split('?')[0]);
      }
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
