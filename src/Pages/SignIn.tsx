import React, { useState } from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from '../Components/Header';
import { authWithGoogle, signIn } from '../Service/firebase/userAuth';
import { ToastNotifyError } from '../Helpers';
import CoreButton from '../Components/common/CoreButton';
import { useAppDispatch } from '../Hooks/hook';
import { userAuth } from '../Redux/Store/auth/authSlice';

const SignIn = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const singInUser = await signIn(email, password);
      dispatch(
        userAuth({
          uId: singInUser.user.uid,
          name: singInUser.user.displayName,
          email: singInUser.user.email,
          picture: singInUser.user.photoURL,
        }),
      );
      setLoading(false);
      navigate('/Profile');
    } catch (error) {
      setLoading(false);
      ToastNotifyError(
        'something is wrong check if email/password are correct 🤖',
      );
    }
  };

  const handleGoogleAuth = async (): Promise<void> => {
    try {
      const googleAuthUser = await authWithGoogle();
      if (googleAuthUser) {
        dispatch(
          userAuth({
            uId: googleAuthUser.uid,
            name: googleAuthUser.displayName,
            email: googleAuthUser.email,
            picture: googleAuthUser.photoURL,
          }),
        );
      }
      navigate('/Profile');
    } catch (error: any) {
      ToastNotifyError(error.message);
    }
  };

  return (
    <>
      <Header />
      <div className='h-screen'>
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <div className='w-full flex justify-center items-center'>
              <div className='w-14 p-1 border-2 border-orange'>
                <Link to='/'>
                  <img
                    width='37'
                    height='32'
                    className='mx-auto h-10 w-auto'
                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
                    alt='Your Company'
                  />
                </Link>
              </div>
              <h1 className='ml-3'>
                <span className='text-purple'>
                  Connect<span className='text-orange'>Hub</span>
                </span>
              </h1>
            </div>
            <h2 className='mt-8 mb-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
              Sign in to your account
            </h2>

            <form
              onSubmit={(e) => handleSignIn(e)}
              className='space-y-6'
              method='POST'
            >
              <div>
                <label
                  htmlFor='email'
                  className='block text-left text-sm font-medium leading-6 text-gray-900'
                >
                  Email address:
                  <div className='mt-2'>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      id='email'
                      name='email'
                      type='email'
                      autoComplete='email'
                      required
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </label>
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block text-left text-sm font-medium leading-6 text-gray-900'
                >
                  Password:
                  <div className='mt-2'>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      id='password'
                      name='password'
                      type='password'
                      autoComplete='current-password'
                      required
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </label>
              </div>

              <div>
                <CoreButton
                  text='Sign in'
                  loading={loading}
                  type='submit'
                  styleClass='w-full flex justify-center bg-hardBlue hover:bg-blue border-2 border-hardBlue text-white-dark hover:text-white-dark p-2 rounded transition duration-200 ease-in'
                />
              </div>
            </form>
          </div>
          <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
            <div className='flex items-center w-full mt-14'>
              <hr className='flex-grow border-t border-gray-300' />
              <span className='px-3 text-sm'>Create Account with Google</span>
              <hr className='flex-grow border-t border-gray-300' />
            </div>
            <div className='w-full mt-3 flex items-center justify-center'>
              <button
                type='button'
                onClick={() => handleGoogleAuth()}
                className='flex items-center p-3 border-2 border-hardBlue hover:bg-soft-blue transition duration-200 ease-in '
              >
                <GoogleIcon />
                <p className='ml-3'>Sign in With Google</p>
              </button>
            </div>
            <div className='mt-5 flex flex-col justify-center items-center'>
              <div className='mt-6'>
                <p className='text-center text-gray-dark'>
                  Not signed up yet?{' '}
                  <Link
                    to='/signUp'
                    className='text-orange hover:text-hardBlue transition duration-200 ease-in'
                  >
                    Go and sign UP!
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignIn;
