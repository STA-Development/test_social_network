import React from "react";
import { useSpring, animated } from 'react-spring'

const Hero = () => {
    const styles = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
        config: { duration: 2000 },
    })
    return (
        <div>
            <div className={"h-screen w-full flex justify-center flex-col items-center"}>
                <animated.div style={styles} className = 'border-2 border-orange p-3 mb-3'>
                    <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                </animated.div>
                <h1 className={"text-3xl"}>Hello and Welcome to <span className='text-purple'>Connect<span className='text-orange'>Hub</span></span></h1>
            </div>
        </div>
    )
}

export default Hero