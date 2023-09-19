import React from 'react';

type data = {
    name: string | null
}

const ProfileSection = ({name}: data) => {
    return (
        <div className="w-full mb-3">
            <section className="w-64 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                <div className="mt-6 w-fit mx-auto">
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/57263bf8f8baf385ff61bb09/1535668320137-NZQPOXCGLFT34I9E4Z1E/Screen+Shot+2018-08-30+at+6.17.10+PM.png"
                        alt=""/>
                </div>

                <div className="mt-8 ">
                    <h2 className="text-white font-bold text-2xl tracking-wide">{name}</h2>
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