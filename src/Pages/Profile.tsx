import React from 'react';
import {getAuth} from "firebase/auth";
import {logOut} from "../Service/firebase/userAuth";
import Header from "../Components/Header";
import {useAppDispatch, useAppSelector} from "../Hooks/hook";
import {useNavigate} from "react-router-dom";
import {userAuth, userLogOut} from "../Redux/Store/auth/authSlice";
import ProfileSection from "../Components/ProfileSection";
import {User} from "../types/typeSection";
import {Oval} from "react-loader-spinner";


const Profile = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user: User | null = useAppSelector(state => state.auth.auth)
    const handleSignOut = async (): Promise<void> => {
        try {
            const out = await logOut()
            dispatch(userLogOut())
            console.log("Log out")
            navigate("/")
        } catch (e: any) {
            console.log(e.message)
        }
    }
    return (
        <>
            <Header/>
            <div className="w-full h-screen flex justify-center">
                <div className='w-full relative bg-blue h-2/5'>
                    <div className="w-96 absolute left-0 right-0 mx-auto -bottom-80 container p-3">
                        {user ? <ProfileSection user={user}/> : ""}
                        <button
                            onClick={() => handleSignOut()}
                            className="w-full bg-red hover:bg-gray-light  text-white-dark hover:text-gray-dark p-2 rounded transition duration-200 ease-in"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;