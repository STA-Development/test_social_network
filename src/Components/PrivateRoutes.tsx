import React from 'react';
import {useAppSelector} from '../Hooks/hook';
import Error from '../Pages/Error';
import {User} from '../types/typeSection';

interface Props {
    elements:JSX.Element
}

const PrivateRoutes = ({ elements }: Props) => {
	const userAuth:User | null =  useAppSelector(state => state.auth.auth);
	return userAuth
		? elements 
		: <Error unAuth={true} message = "just click button below to go to sign In page" />;

};

export default PrivateRoutes;