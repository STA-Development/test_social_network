import React, {useEffect} from 'react';
import {
	RouterProvider,
} from 'react-router-dom';
import {useAppDispatch} from './Hooks/hook';
import auth from './Firebase';
import {userAuth, userLogOut, userToken} from './Redux/Store/auth/authSlice';
import http from './api/httpService';
import {appRouter} from './Routes/Router';

function App():JSX.Element {
	const dispatch = useAppDispatch();
	useEffect(()=> {
		auth.onAuthStateChanged(async (authUser) => {
			if(authUser){
				const authUserIdToken = await authUser.getIdTokenResult();
				const token: string = authUserIdToken.token;
				console.log(authUserIdToken);
				dispatch( userToken( token ) );
				try{
					const { data } = await http.get('userAuth/verifyUser');
					console.log(data);
					dispatch(userAuth({
						uId: data.user_id,
						email: data.email,
						name: data.name,
						picture: data.picture
					}));
				}catch(error){
					if(error instanceof Error){
						console.error(error.message);
					}
				}
			}
			else{
				dispatch(userLogOut());
			}
		});
	},[]);

	return (
		<RouterProvider router={appRouter} />
	);
}

export default App;
