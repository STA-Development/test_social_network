import { UserPost } from '../types/typeSection';
import deleteImage from '../Service/firebase/fileStorage';

interface Props {
  photo: string;
  setUserPost: ((users: UserPost[]) => void) | undefined;
  setLoadingDelete: Function;
  restOfPosts: UserPost[];
  postsLength: number | undefined;
  setPostsLength: ((length: number) => void) | undefined;
}
const usePostDelete = async ({
  photo,
  setUserPost,
  setLoadingDelete,
  restOfPosts,
  postsLength,
  setPostsLength,
}: Props): Promise<void> => {
  if (photo) {
    await deleteImage(photo.split('/')[7].split('?')[0]);
  }
  if (setUserPost) {
    setUserPost([...restOfPosts]);
  }
  setLoadingDelete(null);
  if (postsLength && setPostsLength) {
    let length: number = postsLength;
    setPostsLength((length -= 1));
  }
};

export default usePostDelete;
