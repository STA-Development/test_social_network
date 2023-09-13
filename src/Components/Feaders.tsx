import React from "react";
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

const Feaders = () => {
    return (
        <div className="w-full flex justify-center flex-col items-center mt-3 mb-3">
                    <div className="w-2/4 border-b-2 border-hardBlue mt-3 mb-3"></div>
                    <div className="w-5/12 p-6 border-2 border-hardBlue">
                        <div className="w-full flex justify-start mb-6">
                            <div className="flex flex-row">
                                <AccountCircleRoundedIcon className="!text-6xl" />
                                <div className="ml-3">
                                    <p>Jhone doe</p>
                                    <p>22/09/2023</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p className="text-left border-b-2 mb-3 border-hardBlue">Title:</p>
                            <p className="text-left text-2xl ">My first Post</p>
                        </div>
                        <div className="flex h-full w-full bg-blue-400 justify-center items-center">
                            <img className="object-cover h-48"  src="https://images.squarespace-cdn.com/content/v1/57263bf8f8baf385ff61bb09/1535668320137-NZQPOXCGLFT34I9E4Z1E/Screen+Shot+2018-08-30+at+6.17.10+PM.png" alt=""/>
                        </div>

                        <div className="mt-5 mb-3">
                            <p className="text-left border-b-2 mb-3 border-hardBlue">description:</p>
                            <p className="text-left text-base ">lorem ipsum dolar sit amed</p>
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
                            <button className="flex justify-center items-center transition   duration-150 ease-in-out  bg-transparent hover:bg-blue-500 text-hardBlue font-semibold hover:text-green py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                                <span className="mt-1 mr-1">Follow</span>
                                <ThumbUpOutlinedIcon />
                            </button>
                        </div>

                    </div>
        </div>
    )
}
export default Feaders