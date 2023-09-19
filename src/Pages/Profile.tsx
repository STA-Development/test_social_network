import React from 'react';
import {getAuth} from "firebase/auth";
import {logOut} from "../Service/firebase/userAuth";
import Header from "../Components/Header";
import {useAppDispatch, useAppSelector} from "../Hooks/hook";
import {useNavigate} from "react-router-dom";
import {userAuth,userLogOut} from "../Redux/Store/auth/authSlice";
import ProfileSection from "../Components/ProfileSection";

const Profile = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const user:any = useAppSelector(state => state.auth.auth || null)
    console.log(user)
    const handleSignOut = async() => {
        try {
            const out = await logOut()
            dispatch(userLogOut())
            console.log("Log out")
            navigate("/")
        }catch(e:any){
            console.log(e.message)
        }
    }
    return (
        <>
            <Header />
            <div className="w-full h-screen flex justify-center items-center  p-3">
                <div className="w-6/12 border border-hardBlue container p-3">
                    <ProfileSection name = {user?.name} />
                    <button
                        onClick={()=> handleSignOut()}
                        className = "w-full bg-red hover:bg-gray-light  text-white-dark hover:text-gray-dark p-2 rounded transition duration-200 ease-in"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </>
    );
};

export default Profile;