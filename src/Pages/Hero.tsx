import React from "react";
import { useSpring, animated } from 'react-spring'
import {Trail} from '../Components/common/HeroText'

const Hero = () => {
    const styles = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
        config: { duration: 2000 },
    })
    return (
        <div>
            <div className={"h-screen w-full flex flex-wrap justify-center items-center md:flex-nowrap bg-left bg-fixed bg-origin-border bg-no-repeat"} style={{backgroundImage: `url(https://otkrytky.ru/o/img/0100/otrkytky-ru-34-dHJpa2t5LnJ1.jpg)`}}>
                <div className='w-full h-full flex flex-col justify-center items-center backdrop-saturate-200 backdrop-blur-sm' >
                    <animated.div style={styles} className = 'border-2 border-orange p-3 mb-3'>
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </animated.div>
                    <h1 className={"text-2xl sm:text-3xl transition duration-200 ease-in scale-125 text-white"}>Hello and Welcome to <span className='text-purple'>Connect<span className='text-orange'>Hub</span></span></h1>
                </div>
                <div className='w-full h-screen flex justify-center items-center  bg-gradient-to-r from-hardBlue to-blue text-orange z-0'>
                    <Trail open={true}>
                        <span>Connect</span>
                        <span>To Each</span>
                        <span>Other</span>
                    </Trail>
                </div>
            </div>
        </div>
    )
}

export default Hero