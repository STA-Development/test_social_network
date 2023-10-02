import React, {useEffect, useState} from "react";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Header from "../Components/Header";
import CommentSection from "../Components/CommentSection";
import ShowPosts from "../Components/ShowPosts";
import {UserPost} from "../types/typeSection";
import {getAllPosts} from "../Service/User/RequestsForUsers";
import {Oval} from "react-loader-spinner";

const Feaders = () => {
    const [allPosts, setAllPosts] = useState<UserPost[]>([]);
    useEffect(() => {
        (async () => {
            const getPosts = await getAllPosts();
            console.log(getPosts)
            setAllPosts([...getPosts])
        })()
    },[])
    console.log(allPosts)
    return (
        <>
            <Header />
            <ShowPosts  userPost={allPosts}/>
            {allPosts.length === 0 &&
                <div className='w-full h-screen flex justify-center items-center'>
                    <Oval
                        height={160}
                        width={160}
                        color="#1f66ff"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                        ariaLabel='oval-loading'
                        secondaryColor="#1f66ff"
                        strokeWidth={2}
                        strokeWidthSecondary={2}

                    />
                </div>
            }
        </>
    )
}
export default Feaders