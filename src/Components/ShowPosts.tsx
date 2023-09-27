import React from 'react';
import {UserPost} from "../types/typeSection";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import CommentSection from "./CommentSection";
import {DataEditor} from "../Helpers";

interface props {
    userPost?: UserPost[]
}

const ShowPosts:React.FC<props> = ({userPost}) => {
    console.log(userPost)
    return (
        <div>
            {userPost?.map((post,i) => {
                return(
                    <div key={i} className="w-full flex justify-center flex-col items-center mt-3 mb-3 pb-5">
                        <div className="w-2/4 border-b-2 border-hardBlue mt-3 mb-3"></div>
                        <div className="w-5/12 p-3 border-2 border-hardBlue">
                            <div className="w-full flex justify-start mb-6">
                                <div className="flex flex-row">
                                    <AccountCircleRoundedIcon className="!text-6xl" />
                                    <div className="ml-3">
                                        <p>Jhone doe</p>
                                        <p>Posted At: {DataEditor(post.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-left text-2xl border-b-2 mb-3 border-hardBlue">{post.title}:</p>
                                {/*<p className="text-left  ">{post.description}</p>*/}
                            </div>
                            <div className="flex h-full w-full bg-blue-400 justify-center items-center">
                                <img className="object-cover h-48"  src={post.photo} alt=""/>
                            </div>

                            <div className="mt-5 mb-3">
                                <p className="text-left border-b-2 mb-3 border-hardBlue">description:</p>
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
                                {/*<button className="flex justify-center items-center transition   duration-150 ease-in-out  bg-transparent hover:bg-blue-500 text-hardBlue font-semibold hover:text-green py-2 px-4 border border-blue-500 hover:border-transparent rounded">*/}
                                {/*    <span className="mt-1 mr-1">Follow</span>*/}
                                {/*    <ThumbUpOutlinedIcon />*/}
                                {/*</button>*/}
                            </div>
                            <CommentSection />

                        </div>
                    </div>
                )
            })}
            {userPost?.length === 0 ? <div className={"w-full flex justify-center text-2xl"}><h1>You have no posts</h1></div> : ""}
        </div>
    );
};

export default ShowPosts;