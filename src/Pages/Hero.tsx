import React from "react";
import CommentSection from "../Components/CommentSection";
import {useAppSelector} from "../Hooks/hook";

const Hero = () => {
    const user:Object | null = useAppSelector(state=> state.auth.auth)
    console.log(user)
    return (
        <div>
            <div className={"h-screen w-full flex justify-center items-center"}>
                <h1 className={"text-3xl"}>Hello Dear User</h1>
            </div>
        </div>
    )
}

export default Hero