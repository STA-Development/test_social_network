import React, {FormEvent, useEffect, useState} from "react"
import Header from "../Components/Header";
import {Post, User, UserPost} from "../types/typeSection";
import axios, {AxiosError, AxiosResponse} from "axios";
import {useAppSelector} from "../Hooks/hook";
import ShowPosts from "../Components/ShowPosts";

const PostControll = () => {
    const user:User | null =  useAppSelector(state => state.auth.auth)
    const [postData, setPostData] = useState<Post>({
        title: '',
        description: '',
        photo:{},
        userId: user?.uId,
    })
    const [userPost, setUserPost] = useState<UserPost[]>([]);
    // console.log(user)
    useEffect(()=> {
        (async () => {
            if (user?.uId !== '') {
                axios.get(`http://localhost:3000/post/userPosts/${user?.uId}`)
                .then((response:AxiosResponse<UserPost[]>): void => {
                    console.log(response.data)
                    setUserPost([...response.data])
                }).catch((error:AxiosError): void => {
                    console.log(error.message)
                })
            }
        })()

    }, [user])
    const handlePostSubmit = (e: FormEvent): void => {
        e.preventDefault()
        const postFormData = new FormData();
        postFormData.append('title', postData.title);
        postFormData.append('description', postData.description);
        postFormData.append('photo', postData.photo);
        postFormData.append('userId', user?.uId as string);
        axios.post("http://localhost:3000/post/createPost", {
            title: postData.title,
            description: postData.description,
            photo: postData.photo,
            userId: user?.uId,
        }).then((request: AxiosResponse) => {
            console.log(request)
            setUserPost([...userPost,{...request.data}])
        }).catch((reject) => {
            console.log(reject)
        })
        console.log(postData)
    }
    return (
        <>
            <Header />
            <div className="w-full px-3 py-8">
                <div className="w-full flex flex-col justify-center items-center mb-3">
                    <h1 className="text-3xl uppercase text-center">Share your experience with others</h1>
                    <hr className="w-3/5 mt-3 mb-3 border-t border-hardBlue"/>
                </div>
                <div className="w-full flex justify-center">
                    <form onSubmit={(e: FormEvent) => handlePostSubmit(e)} className="w-7/12 min-h-80 bg-gray-light shadow-md rounded p-3" >
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2" htmlFor="title">Insert your post title:</label>
                            <input
                                onChange={(e) => setPostData({...postData,title:e.target.value})}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                   type="text"
                                   placeholder="Insert your post title"
                                   id="title"
                            />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2" htmlFor="descript">Insert your post description:</label>
                            <input
                                onChange={(e) => setPostData({...postData,description:e.target.value})}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="text"
                                placeholder="Insert your post description"
                                id="descript"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2" htmlFor="image">Add image to your post:</label>
                            <input
                                name={'file'}
                                onChange={(e) => setPostData({...postData,photo:e.target.files})}
                                className="block w-full bg-white p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="file"
                                id="image"
                            />
                        </div>
                        <div className="w-full mt-3">
                            <button
                                type="submit"
                                // className = "bg-hardBlue hover:bg-blue text-white-dark font-bold py-2 px-4 border-b-4 border-hardBlue hover:border-hardBlue rounded"
                                className = "w-full bg-hardBlue hover:bg-blue border-2 border-hardBlue text-white-dark hover:text-gray-dark p-2 rounded transition duration-200 ease-in"
                            >
                                Add post
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <ShowPosts userPost={userPost} />
        </>
    )
}


export default PostControll