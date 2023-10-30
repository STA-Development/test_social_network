import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserPost } from '../../types/typeSection';
import CommentSection from '../Comments';
import { DataEditor, ToastNotifySuccess } from '../../Helpers';
import PostEdit from './PostEdit';
import { deleteUserPost } from '../../Service/User/RequestsForUsers';
import CoreButton from '../common/CoreButton';
import usePostDelete from '../../Hooks/usePostDelete';
import PostBody from './PostBody';

interface Props {
  userPost?: UserPost[] | undefined;
  edit?: boolean;
  setUserPost?: (users: UserPost[]) => void;
  postsLength?: number;
  setPostsLength?: (length: number) => void;
}

const ShowPosts: React.FC<Props> = ({
  userPost,
  edit,
  setUserPost,
  postsLength,
  setPostsLength,
}) => {
  const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<number | null>(null);
  const [wholePost, setWholePost] = useState<UserPost>({} as UserPost);
  const [showUserPosts, setShowUserPosts] = useState<UserPost[]>([]);
  const [open, setOpen] = React.useState(false);
  const [currentPostId, setCurrentPostId] = React.useState<number>(0);
  useEffect(() => {
    if (userPost) {
      setShowUserPosts([...userPost]);
    }
  }, [userPost]);
  const handleClickOpen = (postId: number, post: UserPost) => {
    setOpen(true);
    setCurrentPostId(postId);
    setWholePost({ ...post });
  };
  const deletePost = async (postId: number): Promise<void> => {
    setLoadingDelete(postId);
    const restOfPosts: UserPost[] = await deleteUserPost(postId);
    await usePostDelete({
      setUserPost,
      restOfPosts,
      setLoadingDelete,
      postsLength,
      setPostsLength,
    });
    ToastNotifySuccess('Your post hase been deleted');
    setShowUserPosts([...restOfPosts]);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <PostEdit
        setLoading={setLoadingEdit}
        postId={currentPostId}
        open={open}
        wholePost={wholePost}
        handleClose={handleClose}
        loadingEdit={loadingEdit}
      />
      {showUserPosts.length > 0 &&
        showUserPosts.map((post: UserPost) => {
          return (
            <div
              key={post.id}
              className='w-full min-h-auto flex justify-center flex-col items-center mt-3 mb-3 pb-5'
            >
              <div className='w-2/4 border-b-2 border-hardBlue mt-3 mb-3' />
              <div className='w-5/12 p-3 border-2 border-hardBlue shadow-2xl'>
                <div className='w-full flex justify-between flex-wrap mb-6'>
                  <div className='flex flex-row'>
                    <img
                      src={post.user.picture}
                      alt=''
                      className='w-10 h-10 rounded-full'
                    />
                    <div className='ml-3'>
                      <p>{post.user.userName}</p>
                      <p>Posted At: {DataEditor(post.createdAt)}</p>
                    </div>
                  </div>
                  {edit && (
                    <div className='flex justify-center items-center flex-wrap gap-2'>
                      <CoreButton
                        icon={<EditIcon />}
                        styleClass='w-32 flex justify-center p-1 transition duration-300 ease-in-out hover:bg-soft-yellow text-yellow font-semibold border-2 border-blue-500 hover:border-transparent rounded'
                        onClick={() => handleClickOpen(post.id, post)}
                      />
                      <CoreButton
                        loading={loadingDelete === post.id}
                        disabled={loadingDelete === post.id}
                        icon={<DeleteIcon />}
                        styleClass='w-32 p-1 flex justify-center  transition duration-300 ease-in-out hover:bg-soft-red text-red font-semibold border-2 border-red-500 hover:border-transparent rounded'
                        onClick={() => deletePost(post.id)}
                      />
                    </div>
                  )}
                </div>
                <PostBody
                  title={post.title}
                  photo={post.photo}
                  description={post.description}
                />
                <CommentSection postId={post.id} />
              </div>
            </div>
          );
        })}
      {!userPost && (
        <div className='w-full flex justify-center text-2xl'>
          <h1>You have no posts</h1>
        </div>
      )}
    </div>
  );
};

export default ShowPosts;
