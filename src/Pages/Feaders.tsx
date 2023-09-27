import React, {useEffect, useState} from "react";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Header from "../Components/Header";
import CommentSection from "../Components/CommentSection";
import ShowPosts from "../Components/ShowPosts";
import {UserPost} from "../types/typeSection";
import axios, {AxiosResponse} from "axios";
import {getAllPosts} from "../Service/User/RequestsForUsers";

const Feaders = () => {
    const [allPosts, setAllPosts] = useState<UserPost[]>([]);
    useEffect(() => {
        (async () => {
            const getPosts:AxiosResponse<UserPost[]> = await getAllPosts();
            // console.log(getPosts.data)
            setAllPosts([...getPosts.data])
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