import React, {useEffect, useState} from 'react';
import { UserPost} from "../types/typeSection";
import CommentSection from "./CommentSection";
import {DataEditor} from "../Helpers";
import PostEdit from "./PostEdit";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {deleteUserPost} from "../Service/User/RequestsForUsers";
import {deleteImage} from "../Service/firebase/fileStorage";
import {useAppSelector} from "../Hooks/hook";

interface props {
    userPost?: UserPost[] | undefined
    edit?: boolean
    setUserPost?: Function
}

const ShowPosts:React.FC<props> = ({userPost, edit, setUserPost}) => {
    const token: string = useAppSelector(state => state.auth.token)
    const [wholePost , setWholePost] = useState<UserPost>({} as UserPost)
    const [showUserPosts, setShowUserPosts] = useState<UserPost[]>([])
    useEffect(() => {
        if(userPost){
            setShowUserPosts([...userPost])
        }
    },[userPost])
    const [open, setOpen] = React.useState(false);
    const [currentPostId, setCurrentPostId] = React.useState<number>(0)
    const handleClickOpen = (postId: number, post:UserPost) => {
        setOpen(true);
        setCurrentPostId(postId);
        setWholePost({...post})
    };
    const deletePost = async (postId:number, photo: string):Promise<void> =>{
            const restOfPosts:UserPost[] =  await deleteUserPost(postId, token)
            if(photo){
                deleteImage(photo.split('/')[7].split('?')[0])
            }
                if(setUserPost){
                    setUserPost([...restOfPosts])
                }
                setShowUserPosts([...restOfPosts])
    }
    const handleClose = () => {
        setOpen(false);
    };
    console.log(showUserPosts)
    return (
        <div>
            <PostEdit postId = {currentPostId} open={open} wholePost={wholePost} handleClose={handleClose} />
            {showUserPosts.length>0 && showUserPosts.map((post,i) => {
                return(
                    <div key={i} className="w-full flex justify-center flex-col items-center mt-3 mb-3 pb-5">
                        <div className="w-2/4 border-b-2 border-hardBlue mt-3 mb-3"></div>
                        <div className="w-5/12 h-128 p-3 border-2 border-hardBlue">
                            <div className="w-full flex justify-between flex-wrap mb-6">
                                <div className="flex flex-row">
                                    <img src={post.user.picture} alt="" className="w-10 h-10 rounded-full" />
                                    <div className="ml-3">
                                        <p>{post.user.userName}</p>
                                        <p>Posted At: {DataEditor(post.createdAt)}</p>
                                    </div>
                                </div>
                                {edit &&
                                    <div className='flex justify-center items-center flex-wrap gap-2'>
                                        <button onClick={() => handleClickOpen(post.id,post)} className="w-32 p-1 transition duration-300 ease-in-out hover:bg-soft-yellow text-yellow font-semibold border border-blue-500 hover:border-transparent rounded">
                                            <EditIcon />
                                        </button>
                                        <button onClick={() => deletePost(post.id, post.photo)} className="w-32 p-1  transition duration-300 ease-in-out hover:bg-soft-red text-red font-semibold border border-red-500 hover:border-transparent rounded">
                                            <DeleteIcon />
                                        </button>
                                    </div>
                                }
                            </div>
                            <div>
                                <h1 className='text-2xl border-b-2 mb-3 border-hardBlue  text-hardBlue'>Title:</h1>
                                <p className="text-left text-2xl mb-3 ">{post.title}:</p>
                            </div>
                            {post.photo &&
                                <div className="flex h-full w-full bg-blue-400 justify-center items-center">
                                    <img className="object-cover h-48"  src={post.photo} alt=""/>
                                </div>
                            }

                            <div className="mt-5 mb-3">
                                <p className="text-left border-b-2 mb-3 border-hardBlue text-hardBlue">description:</p>
                                <p className="text-left text-base ">{post.description}</p>
                            </div>
                            <div className="w-full flex justify-between">
                                <div className="flex justify-center items-center -space-x-1 overflow-hidden">
                                    <img
                                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                    <img
                                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                        src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                    <img
                                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                        alt=""
                                    />
                                    <img
                                        className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <CommentSection postId = {post.id}  />
                        </div>
                    </div>
                )
            })}
            {!userPost &&  <div className={"w-full flex justify-center text-2xl"}><h1>You have no posts</h1></div> }
        </div>
    );
};

export default ShowPosts;