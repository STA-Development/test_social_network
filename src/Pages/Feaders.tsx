import React, {useEffect, useState} from "react";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Header from "../Components/Header";
import CommentSection from "../Components/CommentSection";
import ShowPosts from "../Components/ShowPosts";
import {UserPost} from "../types/typeSection";
import {getAllPosts} from "../Service/User/RequestsForUsers";

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
        </>
    )
}
export default Feaders