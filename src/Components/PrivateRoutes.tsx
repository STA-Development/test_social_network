import React from 'react';
import {useAppSelector} from "../Hooks/hook";
import Error from "../Pages/Error"



const PrivateRoutes = ({elements}:any) => {
    const userAuth:object | null = useAppSelector(state => state.auth.auth)
    return userAuth ? elements : <Error message = "Ooops... It's looks like you are not authorized please make sure that you have signed in" />
};

export default PrivateRoutes;