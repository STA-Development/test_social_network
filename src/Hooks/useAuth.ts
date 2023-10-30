import { useEffect } from 'react';
import { useAppDispatch } from './hook';
import { auth } from '../Firebase';
import { userAuth, userLogOut, userToken } from '../Redux/Store/auth/authSlice';
import http from '../api/httpService';

const useAuth = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        const authUserIdToken = await authUser.getIdTokenResult();
        const { token } = authUserIdToken;
        dispatch(userToken(token));
        try {
          const { data } = await http.get('user/Verify');
          dispatch(
            userAuth({
              uId: data.uId,
              email: data.email,
              name: data.name,
              picture: data.picture,
            }),
          );
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          }
        }
      } else {
        dispatch(userLogOut());
      }
    });
  }, []);
};

export default useAuth;
