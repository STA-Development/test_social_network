import axios, {AxiosResponse} from "axios";
import {User, UserPost} from "../../types/typeSection";

export const getAllPosts = async ():Promise<UserPost[]> => {
    const { data } = await axios.get('http://localhost:3000/post/getAllPosts')
    return data;
}

export const getCurrentUserPosts = async (user: User | null, token: string):Promise<UserPost[]> => {
    const {data}= await axios.get(`http://localhost:3000/post/userPosts/${user?.uId}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data
}
export const createPost = async (postFormData: FormData, token:string):Promise<UserPost[]> => {
    const {data} = await axios.post('http://localhost:3000/post/createPost', postFormData,{
        headers: {
            Authorization:`Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        }
    })
    return data
}

export const addNextTenPosts = async (length:number): Promise<UserPost[]> => {
    console.log('...gettingNext')
    const {data} = await axios.get(`http://localhost:3000/post/getAllPosts/${length}`)
    return data
}

export const addUserNextTenPosts = async (length:number, token: string):Promise<UserPost[]> => {
    console.log('...gettingNext for User')
    const {data} = await axios.get(`http://localhost:3000/post/getUserAllPosts/${length}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    return data
}

export const editUserPost = async (postId:number, editFormData:FormData, token: string):Promise<[UserPost, string]> => {
    console.log('...editing')
    console.log(editFormData.get('title'))
    const {data} = await axios.patch(`http://localhost:3000/post/edit/${postId}`,editFormData,{
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-type": "multipart/form-data"
        }
    })
    return data
}

export const deleteUserPost = async (postId:number, token: string):Promise<UserPost[]> => {
    console.log('...deleting')
    const {data} = await axios.delete(`http://localhost:3000/post/delete/${postId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}
