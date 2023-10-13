import React from "react";
import CommentSection from "../Components/CommentSection";
import {useAppSelector} from "../Hooks/hook";

const Hero = () => {
    const user:Object | null = useAppSelector(state=> state.auth.auth)
    return (
        <div>
            <div className={"h-screen w-full flex justify-center flex-col items-center"}>
                <div className = 'border-2 border-orange p-3 mb-3'>
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </div>
                <h1 className={"text-3xl"}>Hello and Welcome to <span className='text-purple'>Connect<span className='text-orange'>Hub</span></span></h1>
            </div>
        </div>
    )
}

export default Hero