import axios, {AxiosResponse} from "axios";
import {UserPost} from "../../types/typeSection";

export const getAllPosts = async ():Promise<AxiosResponse<UserPost[]>> => {
    return await axios.get('http://localhost:3000/post/getAllPosts')
}