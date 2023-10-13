import React from 'react';
import {User} from "../types/typeSection";

type Data = {
    email: string
    name: string
    picture: string
    uId: string
}

const ProfileSection:React.FC <{ user: User }> = ({user}) => {
    console.log(user)
    return (
        <div className="w-full mb-3">
            <section className="w-80 h-96 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                <div className="mt-6 w-fit mx-auto">
                    <img
                        src={user?.picture || ""}
                        alt=""
                        referrerPolicy="no-referrer"
                    />
                </div>

                <div className="mt-8 text-center">
                    <h2 className="text-white font-bold text-xl tracking-wide">{user.name}</h2>
                </div>
                <div className="h-1 w-full bg-black mt-8 rounded-full">
                    <div className="h-1 rounded-full w-2/5 bg-yellow-500 "></div>
                </div>
                <div className="mt-3 text-white text-sm">
                </div>
            </section>
        </div>
    );
};

export default ProfileSection;