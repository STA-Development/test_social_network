import React, {FormEvent, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Post, UserPost} from "../types/typeSection";
import {postSchema} from "../validator";
import { editUserPost} from "../Service/User/RequestsForUsers";
import {ToastNotifyError, ToastNotifySuccess} from "../Helpers";
import {deleteImage} from "../Service/firebase/fileStorage";
import {useAppDispatch, useAppSelector} from "../Hooks/hook";
import {editPosts} from "../Redux/Store/posts/postsSlice";

interface Props {
    open: boolean
    handleClose: Function
    postId: number
    wholePost: UserPost
}
const PostEdit:React.FC<Props> = ({open, handleClose, postId,wholePost}) => {
    const dispatch = useAppDispatch()
    const token = useAppSelector(state => state.auth.token)
    const [postData, setPostData] = useState<Post>({
        title: '',
        description: '',
        photo:{},
    })
    useEffect(() => {
        if(wholePost.title && wholePost.description){
            setPostData({...postData,title:wholePost.title,description:wholePost.description})
            console.log(3213213);
        }
        else
            console.log('not working')
    }, [wholePost]);
    const editPost = async (e:FormEvent):Promise<void> => {
        e.preventDefault()
        const validationResult: boolean = await postSchema.isValid(postData)
        if(validationResult){
            const editFormData: FormData = new FormData();
            editFormData.append('title', postData.title);
            editFormData.append('description', postData.description);
            if(postData.photo){editFormData.append('photo', postData.photo[0]);}
            try {
                const editedPostResponse:[UserPost[], string] = await editUserPost(postId,editFormData, token)
                const allPosts:UserPost[] = editedPostResponse[0]
                dispatch(editPosts(allPosts))
                console.log(editedPostResponse)
                if(editedPostResponse[1]){
                    deleteImage(editedPostResponse[1].split('/')[7].split('?')[0])
                }
                ToastNotifySuccess()
            }catch (error: any){
                console.error(error.message)
                ToastNotifyError(error.message)
            }
        }
        else{
            ToastNotifyError()
        }
    }
    return (
        <div className='w-full'>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>EDIT</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        YOU CAN EDIT YOUR POST IF YOU WANT 🙃:
                    </DialogContentText>
                    <form onSubmit={(e:FormEvent) => editPost(e)} className="w-96 min-h-80 bg-gray-light shadow-md rounded p-3" >
                        <div className="flex flex-col">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2" htmlFor="title">Insert your post title:</label>
                            <input
                                value={postData.title}
                                onChange={(e) => setPostData({...postData, title: e.target.value})}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="text"
                                placeholder="Insert your post title"
                                id="title"
                            />
                        </div>
                        <div className="flex flex-col mt-3">
                            <label className="block text-sm font-medium leading-6 text-gray-900 mb-2" htmlFor="descript">Insert your post description:</label>
                            <input
                                defaultValue={postData.description}
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
                                onClick={() => handleClose()}
                                className = "w-full bg-yellow hover:bg-soft-yellow border-2 border-yellow text-white-dark hover:text-gray-dark p-2 rounded transition duration-200 ease-in"
                            >
                                Edit post
                            </button>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PostEdit;