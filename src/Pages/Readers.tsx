import React, { useEffect, useState } from 'react';
import { Oval } from 'react-loader-spinner';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ToastContainer } from 'react-toastify';
import Header from '../Components/Header';
import ShowPosts from '../Components/ShowPosts';
import { UserPost } from '../types/typeSection';
import {
  addNextTenPosts,
  allPostsLength,
  getAllPosts,
} from '../Service/User/RequestsForUsers';
import { ToastNotifyError } from '../Helpers';
import { useAppSelector } from '../Hooks/hook';

const Readers = () => {
  const token: string = useAppSelector((state) => state.auth.token);
  const [loading, setLoading] = useState<boolean>(false);
  const [allPosts, setAllPosts] = useState<UserPost[]>([]);
  const [postsLength, setPostsLength] = useState<number>(0);
  useEffect((): void => {
    (async (): Promise<void> => {
      const getPosts: UserPost[] = await getAllPosts();
      setLoading(true);
      setAllPosts([...getPosts]);
    })();
  }, [token]);
  useEffect(() => {
    (async (): Promise<void> => {
      const getAllPostsLength: number = await allPostsLength();
      setPostsLength(getAllPostsLength);
    })();
  }, [token]);
  const addMorePosts = async (): Promise<void> => {
    const getMore: UserPost[] = await addNextTenPosts(allPosts.length);
    if (getMore.length === 0) {
      ToastNotifyError('there is no more posts Sorry 😞');
    }
    setAllPosts([...allPosts, ...getMore]);
  };
  return (
    <>
      <Header />
      {allPosts.length === 0 && loading && (
        <div className='w-full h-screen flex justify-center items-center text-center'>
          <h1 className=''>There is no posts right now</h1>
        </div>
      )}
      <ShowPosts userPost={allPosts} />
      {postsLength !== allPosts.length && (
        <div className='w-full flex justify-center items-center p-3'>
          <nav>
            {allPosts && (
              <button
                type='button'
                onClick={() => addMorePosts()}
                className='flex items-center justify-center px-3 h-8 ml-0 leading-tight text-hardBlue bg-white border border-hardBlue rounded-full hover:bg-soft-blue transition ease-in'
              >
                <ArrowDownwardIcon />
              </button>
            )}
          </nav>
        </div>
      )}
      {!loading && (
        <div className='w-full h-screen flex justify-center items-center'>
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
export default Readers;
