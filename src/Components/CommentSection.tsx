import React, {FormEvent, useEffect, useState} from "react";
import CommentDialogSection from "./CommentDialogSection";
import commentDialogSection from "./CommentDialogSection";
import {addComment, getComments} from "../Service/User/RequestsForUsers";
import {useAppSelector} from "../Hooks/hook";
import {commentSchema} from "../validator";
import {ToastNotifyError, ToastNotifySuccess} from "../Helpers";
import {CommentFromDB} from "../types/typeSection";

//TODO make that if user have commented it's avatar will be at first in commented users section and be highlighted
interface Props {
    postId: number
}

const CommentSection: React.FC<Props> = ({postId}) => {
    const [open, setOpen] = useState<boolean>(false);
    const [comment, setComment] = useState<string>('')
    const token: string = useAppSelector(state => state.auth.token);
    const [spinIsActive, setSpinIsActive] = useState<boolean>(false)
    const [postComments, setPostComments] = useState<CommentFromDB[]>([])
    const handleClickOpen = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(postId)
            setSpinIsActive(true)
            const getPostComments = await getComments(postId, token)
            setPostComments([...getPostComments])
            setSpinIsActive(false)
            setOpen(true);
    };
    const handleCommentAdding = async (e: FormEvent): Promise<void> => {
        e.preventDefault()
        const validationRules: boolean = await commentSchema.isValid({comment})
        console.log(validationRules)
        if (validationRules) {
            const commentAdded = await addComment(comment, postId, token)
            ToastNotifySuccess('Your comment has been added check in show Comments')
        } else {
            ToastNotifyError('Something went wrong (remember text size must be lower then 200)🤔')
        }
    }

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <section className="w-full flex justify-center flex-col p-3 mt-3">
            {/*<div className="w-full flex justify-between mb-3">*/}
            {/*    <div className="flex justify-center items-center -space-x-1 overflow-hidden">*/}
            {/*        <img*/}
            {/*            className="inline-block h-6 w-6 rounded-full ring-2 ring-white"*/}
            {/*            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"*/}
            {/*            alt=""*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
            <form onSubmit={(e) => handleCommentAdding(e)} className="w-full">
                <div>
                    <textarea
                        // maxLength="210" xModel="maximum" xRef="maximum"
                        onChange={(e) => setComment(e.target.value)}
                        id="message" rows={4}
                        className="block p-2.5 w-full text-sm text-gray-dark bg-gray-50 rounded-lg border-hardBlue resize-none"
                        placeholder="Write your thoughts here..."
                    ></textarea>
                    <div className="w-full flex items-center justify-between flex-wrap rounded-lg h-16">
                        <button
                            onClick={(e) => handleClickOpen(e)}
                            className="w-48 mt-3 bg-hardBlue hover:bg-blue border-2 border-hardBlue text-white-dark hover:text-white-dark p-1 rounded transition duration-200 ease-in"
                        >Show Comments
                        </button>
                        <button
                            className="w-48 mt-3 bg-hardBlue hover:bg-blue border-2 border-hardBlue text-white-dark hover:text-white-dark p-1 rounded transition duration-200 ease-in"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </form>
            <CommentDialogSection postComments={postComments} spinIsActive={spinIsActive} handleClose={handleClose}
                                  open={open}/>
        </section>
    )
}

export default CommentSection