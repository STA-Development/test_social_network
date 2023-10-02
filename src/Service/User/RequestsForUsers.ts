import axios, {AxiosResponse} from "axios";
import {User, UserPost} from "../../types/typeSection";
import {AxiosError} from "axios/index";

export const getAllPosts = async ():Promise<UserPost[]> => {
    const { data } = await axios.get('http://localhost:3000/post/getAllPosts')
    console.log(data)
    return data;
}

export const getCurrentUserPosts = async (user: User | null):Promise<UserPost[]> => {
    const {data}= await axios.get(`http://localhost:3000/post/userPosts/${user?.uId}`)
    console.log(data)
    return data
}
export const createPost = async (postFormData: FormData):Promise<UserPost[]> => {
    const {data} = await axios.post('http://localhost:3000/post/createPost', postFormData,{
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return data
}

export const addNextTenPosts = async (length:number): Promise<UserPost[]> => {
    console.log('...gettingNext')
    const {data} = await axios.get(`http://localhost:3000/post/getAllPosts/${length}`)
    return data
}

export const addUserNextTenPosts = async (length:number,user: User | null):Promise<UserPost[]> => {
    console.log('...gettingNext for User')
    const {data} = await axios.get(`http://localhost:3000/post/getUserAllPosts/${length}/${user?.uId}`)
    return data
}