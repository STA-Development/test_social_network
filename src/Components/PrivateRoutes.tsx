import React from 'react';
import {useAppSelector} from "../Hooks/hook";
import Error from "../Pages/Error"
import {User} from "../types/typeSection";



const PrivateRoutes = ({elements}:any) => {
    const userAuth:User | null =  useAppSelector(state => state.auth.auth)
    return userAuth
        ? elements
        : <Error unAuth={true} message = "just click button below to go to sign In page" />

};

export default PrivateRoutes;