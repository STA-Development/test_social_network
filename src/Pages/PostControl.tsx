import React, { FormEvent, useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { ToastContainer } from 'react-toastify';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Header from '../Components/Header';
import { Post, User, UserPost } from '../types/typeSection';
import { useAppDispatch, useAppSelector } from '../Hooks/hook';
import ShowPosts from '../Components/ShowPosts';
import {
  addUserNextTenPosts,
  allUserPostsLength,
  createPost,
  getCurrentUserPosts,
} from '../Service/User/RequestsForUsers';
import { postSchema } from '../validator';
import { ToastNotifyError, ToastNotifySuccess } from '../Helpers';
import { editPosts } from '../Redux/Store/posts/postsSlice';
import CoreButton from '../Components/common/CoreButton';

const PostControl = () => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const editedPosts: UserPost[] | null = useAppSelector(
    (state) => state.posts.posts,
  );
  const dispatch = useAppDispatch();
  const user: User | null = useAppSelector((state) => state.auth.auth);
  const token: string = useAppSelector((state) => state.auth.token);
  const [postsLength, setPostsLength] = useState<number>(0);
  const [postData, setPostData] = useState<Post>({
    title: '',
    description: '',
    photo: null,
    userId: user?.uId,
  });
  const [filePreview, setFilePreview] = useState<string>('');
  const [userPost, setUserPost] = useState<UserPost[]>([]);
  useEffect(() => {
    if (editedPosts) {
      setUserPost([...editedPosts]);
      dispatch(editPosts(null));
    }
  }, [editedPosts]);
  const getUserPosts = async (): Promise<void> => {
    if (user?.uId !== '') {
      const Posts: UserPost[] = await getCurrentUserPosts(user, token);
      setLoading(true);
      setUserPost([...Posts]);
    }
  };
  const userPostsLength = async (): Promise<void> => {
    if (token) {
      const getPostsLength: number = await allUserPostsLength(token);
      setPostsLength(getPostsLength);
    }
  };
  useEffect((): void => {
    getUserPosts();
  }, [user]);
  useEffect((): void => {
    userPostsLength();
  }, [token]);
  const handleFileUploading = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostData({ ...postData, photo: e.target });
    if (e.target.files) {
      try {
        const url: string = URL.createObjectURL(e.target.files[0]);
        setFilePreview(url);
      } catch (err) {
        setFilePreview('');
      }
    }
  };
  const handlePostSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    const validationResult: boolean = await postSchema.isValid(postData);
    if (validationResult) {
      const postFormData: FormData = new FormData();
      postFormData.append('title', postData.title);
      postFormData.append('description', postData.description);
      if (postData.photo && postData.photo.files) {
        postFormData.append('photo', postData.photo.files[0]);
      }
      postFormData.append('userId', user?.uId as string);
      if (postData.photo) {
        postData.photo.value = '';
      }
      setPostData({ ...postData, title: '', description: '', photo: null });
      try {
        setButtonLoading(true);
        const createdPostResponse: UserPost[] = await createPost(
          postFormData,
          token,
        );
        setUserPost([...userPost, ...createdPostResponse]);
        ToastNotifySuccess();
        setButtonLoading(false);
        await userPostsLength();
        setFilePreview('');
      } catch (error: any) {
        setButtonLoading(false);
        setFilePreview('');
        ToastNotifyError(
          'Something went wrong check if all inputs are filled and image type is correct(jpg/png) ',
        );
      }
    } else {
      ToastNotifyError();
    }
  };
  const addMorePosts = async (): Promise<void> => {
    const getMore: UserPost[] = await addUserNextTenPosts(
      userPost.length,
      token,
    );
    if (getMore.length === 0) {
      ToastNotifyError('you have no more posts  😕');
    }
    setUserPost([...userPost, ...getMore]);
  };
  return (
    <>
      <Header />
      <div className='w-full px-3 py-8'>
        <div className='w-full flex flex-col justify-center items-center mb-3'>
          <div className='border-2 border-orange p-3 mb-3'>
            <img
              className='h-8 w-auto'
              src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
              alt=''
            />
          </div>
          <h1 className='text-3xl uppercase text-center'>
            Share your experience with others
          </h1>
          <hr className='w-3/5 mt-3 mb-3 border-t border-hardBlue' />
        </div>
        <div className='w-full flex justify-center'>
          <form
            onSubmit={(e: FormEvent) => handlePostSubmit(e)}
            className='w-7/12 min-h-80 bg-gray-light shadow-2xl rounded p-3'
          >
            <div className='flex flex-col'>
              <label
                className='block text-sm font-medium leading-6 text-gray-900 mb-2'
                htmlFor='title'
              >
                Insert your post title:
                <input
                  value={postData.title}
                  onChange={(e) =>
                    setPostData({ ...postData, title: e.target.value })
                  }
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-hardBlue sm:text-sm sm:leading-6'
                  type='text'
                  placeholder='Insert your post title'
                  id='title'
                />
              </label>
            </div>
            <div className='flex flex-col mt-3'>
              <label
                className='block text-sm font-medium leading-6 text-gray-900 mb-2'
                htmlFor='descript'
              >
                Insert your post description:
                <input
                  value={postData.description}
                  onChange={(e) =>
                    setPostData({ ...postData, description: e.target.value })
                  }
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-hardBlue sm:text-sm sm:leading-6'
                  type='text'
                  placeholder='Insert your post description'
                  id='descript'
                />
              </label>
            </div>
            <div className='flex flex-col'>
              <label
                className='block text-sm font-medium leading-6 text-gray-900 mb-2'
                htmlFor='image'
              >
                Add image to your post:
                <input
                  name='file'
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleFileUploading(e)
                  }
                  className='block w-full bg-white p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-hardBlue sm:text-sm sm:leading-6'
                  type='file'
                  id='image'
                />
              </label>
            </div>
            {filePreview.length > 0 && (
              <div className='w-full flex justify-center mt-3'>
                <img src={filePreview} alt='' className='w-72 h-56 ' />
              </div>
            )}
            <div className='w-full mt-3'>
              <CoreButton
                text='Add Post'
                loading={buttonLoading}
                type='submit'
                styleClass='w-full flex justify-center bg-hardBlue hover:bg-blue border-2 border-hardBlue text-white hover:text-w p-2 rounded transition duration-200 ease-in'
              />
            </div>
          </form>
        </div>
      </div>
      <ShowPosts
        edit
        userPost={userPost}
        setUserPost={setUserPost}
        postsLength={postsLength}
        setPostsLength={setPostsLength}
      />
      {userPost.length === 0 && loading && (
        <div className='w-full h-full text-center'>
          <h1 className=''>There is no posts right now</h1>
        </div>
      )}
      {userPost.length !== postsLength && (
        <div className='w-full flex justify-center items-center p-3'>
          <nav>
            <button
              type='button'
              onClick={() => addMorePosts()}
              className='flex items-center justify-center px-3 h-8 ml-0 leading-tight text-hardBlue bg-white border border-hardBlue rounded-full hover:bg-soft-blue transition ease-in'
            >
              <ArrowDownwardIcon />
            </button>
          </nav>
        </div>
      )}
      {!loading && (
        <div className='w-full flex justify-center items-center'>
          <Oval
            height={160}
            width={160}
            color='#1f66ff'
            wrapperStyle={{}}
            wrapperClass=''
            visible
            ariaLabel='oval-loading'
            secondaryColor='#1f66ff'
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default PostControl;
