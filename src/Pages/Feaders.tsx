import React, {useEffect, useState} from "react";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Header from "../Components/Header";
import CommentSection from "../Components/CommentSection";
import ShowPosts from "../Components/ShowPosts";
import {UserPost} from "../types/typeSection";
import {addNextTenPosts, getAllPosts} from "../Service/User/RequestsForUsers";
import {Oval} from "react-loader-spinner";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import {ToastNotifyError, ToastNotifySuccess} from "../Helpers";
import {ToastContainer} from "react-toastify";

const Feaders = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [allPosts, setAllPosts] = useState<UserPost[]>([]);
    useEffect(():void => {
        (async ():Promise<void> => {
            const getPosts:UserPost[] = await getAllPosts();
            setLoading(true)
            setAllPosts([...getPosts])
        })()
    },[])
    const addMorePosts = async ():Promise<void> => {
        const getMore:UserPost[] = await addNextTenPosts(allPosts.length)
        console.log(getMore)
        if(getMore.length === 0 ){
            ToastNotifyError('there is no more posts Sorry 😞')
        }
        setAllPosts([...allPosts,...getMore])
    }
    return (
        <>
            <Header />
            {allPosts.length === 0 && loading &&
                <div className='w-full h-full text-center'>
                    <h1 className=''>There is no posts right now</h1>
                </div>
            }
            <ShowPosts  userPost={allPosts}/>
            {allPosts.length !== 0  &&
            <div className='w-full flex justify-center items-center p-3'>
                <nav >
                    {allPosts  &&
                        <button onClick={() => addMorePosts()} className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-hardBlue bg-white border border-hardBlue rounded-full hover:bg-soft-blue transition ease-in">
                            <ArrowDownwardIcon />
                        </button>
                    }
                </nav>
            </div>
            }
            {!loading &&
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
            <ToastContainer />
        </>
    )
}
export default Feaders