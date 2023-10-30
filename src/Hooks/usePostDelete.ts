import { UserPost } from '../types/typeSection';

interface Props {
  setUserPost: ((users: UserPost[]) => void) | undefined;
  setLoadingDelete: Function;
  restOfPosts: UserPost[];
  postsLength: number | undefined;
  setPostsLength: ((length: number) => void) | undefined;
}
const usePostDelete = async ({
  setUserPost,
  setLoadingDelete,
  restOfPosts,
  postsLength,
  setPostsLength,
}: Props): Promise<void> => {
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
