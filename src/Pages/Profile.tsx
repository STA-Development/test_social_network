import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../Service/firebase/userAuth';
import Header from '../Components/Header';
import { useAppDispatch, useAppSelector } from '../Hooks/hook';
import { userLogOut } from '../Redux/Store/auth/authSlice';
import { User } from '../types/typeSection';
import ProfileSection from '../Components/Profile';
import ProfileSettings from '../Components/Profile/common/ProfileSettings';

const Profile = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user: User | null = useAppSelector((state) => state.auth.auth);
  const handleSignOut = async (): Promise<void> => {
    try {
      await logOut();
      dispatch(userLogOut());
      navigate('/');
    } catch (e: any) {
      console.error(e.message);
    }
  };
  return (
    <>
      <Header />
      <div className='w-full h-HeaderScreen flex flex-col'>
        <div className='w-full relative bg-blue h-2/5'>
          <div className='w-full absolute left-0 right-0 mx-auto -bottom-80 container p-3'>
            {user && <ProfileSection user={user} />}
            <div className='flex justify-center'>
              <button
                type='button'
                onClick={() => handleSignOut()}
                className='w-96 bg-red hover:bg-gray-light  text-white-dark hover:text-gray-dark p-2 rounded transition duration-200 ease-in'
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
      <main className=''>
        <ProfileSettings />
      </main>
    </>
  );
};

export default Profile;
