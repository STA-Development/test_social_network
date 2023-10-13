import React, {FormEvent, useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Post, UserPost} from "../types/typeSection";
import {postSchema} from "../validator";
import {editUserPost} from "../Service/User/RequestsForUsers";
import {ToastNotifyError, ToastNotifySuccess} from "../Helpers";
import {deleteImage} from "../Service/firebase/fileStorage";
import {useAppDispatch, useAppSelector} from "../Hooks/hook";
import {editPosts} from "../Redux/Store/posts/postsSlice";

interface Props {
    open: boolean
    handleClose: Function
    postId: number
    wholePost: UserPost
    setLoading: Function
}
const PostEdit:React.FC<Props> = ({open, handleClose, postId,wholePost,setLoading}) => {
    const dispatch = useAppDispatch()
    const [blur,setBlur] = useState<boolean>(false)
    const [showNotDelete, setShowNotDelete] = useState<boolean>(false)
    const [notDelete, setNotDelete] = useState<boolean>(false)
    const token = useAppSelector(state => state.auth.token)
    const [filePreview, setFilePreview] = useState('')
    const [postData, setPostData] = useState<Post>({
        title: '',
        description: '',
        photo:{},
    })
    useEffect(() => {
        if(wholePost.title && wholePost.description){
            setPostData({...postData,title:wholePost.title,description:wholePost.description})
        }
        if(wholePost.photo){
            setFilePreview(wholePost.photo)
            setShowNotDelete(true)
        }else{setFilePreview('')}
    }, [wholePost]);
    const handleFileUploading = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPostData({...postData,photo:e.target})
        console.log(e.target.files)
        setShowNotDelete(false)
        setBlur(false)
        setNotDelete(true)
        if(e.target.files){
            const url:string = URL.createObjectURL(e.target.files[0])
            setFilePreview(url)
        }
    }
    const handleDeletePhoto = async () => {
        setNotDelete(!notDelete)
        setBlur(!blur)
    }
    const editPost = async (e:FormEvent):Promise<void> => {
        e.preventDefault()
        const validationResult: boolean = await postSchema.isValid(postData)
        if(validationResult){
            const editFormData: FormData = new FormData();
            editFormData.append('title', postData.title);
            editFormData.append('description', postData.description);
            if(postData.photo.files && postData.photo.files[0]){
                console.log(postData.photo.files[0])
                editFormData.append('photo', postData.photo.files[0]);
            }
            editFormData.append('delete', String(notDelete))
            try {
                setLoading(true)
                const editedPostResponse:[UserPost[], string] = await editUserPost(postId,editFormData,token)
                const allPosts:UserPost[] = editedPostResponse[0]
                dispatch(editPosts(allPosts))
                console.log(editedPostResponse)
                if(editedPostResponse[1] && notDelete){
                    deleteImage(editedPostResponse[1].split('/')[7].split('?')[0])
                }
                setPostData({
                    title: '',
                    description: '',
                    photo:{},
                })
                setNotDelete(false)
                setLoading(false)
                setBlur(false)
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
            <Dialog open={open} onClose={() => {
                handleClose()
                setNotDelete(false)
                setShowNotDelete(false)
                setBlur(false)
            }}>
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
                                onChange={(e:React.ChangeEvent<HTMLInputElement>) => handleFileUploading(e)}
                                className="block w-full bg-white p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                type="file"
                                id="image"
                            />
                        </div>

                        <div className='relative'>
                            {filePreview && filePreview.length>0 &&
                                <div className='w-full flex justify-center mt-3'>
                                    <img src={filePreview} alt="" className={`w-72 h-56 transition duration-200 ease-in ${blur && 'blur'}`}/>
                                </div>
                            }
                            {showNotDelete && filePreview.length>0 &&
                                <div className='absolute top-3 right-10 -mt-1'>
                                    <div onClick={() => handleDeletePhoto()} className={notDelete? 'cursor-pointer bg-none transition duration-200 ease-in text-bright-red text-2xl' : 'cursor-pointer transition duration-200 ease-in text-white-dark text-2xl'}>
                                        <HighlightOffIcon fontSize={'large'} />
                                    </div>
                                </div>
                            }
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
                    <Button onClick={() => {
                        handleClose()
                        setNotDelete(false)
                        setShowNotDelete(false)
                        setBlur(false)
                    }}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default PostEdit;