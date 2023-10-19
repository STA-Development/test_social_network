import React, { FormEvent, useState } from 'react';
import CommentDialogSection from './CommentDialogSection';
import { addComment, getComments } from '../Service/User/RequestsForUsers';
import { useAppSelector } from '../Hooks/hook';
import { commentSchema } from '../validator';
import { ToastNotifyError, ToastNotifySuccess } from '../Helpers';
import { CommentFromDB, User } from '../types/typeSection';
import CoreButton from './common/CoreButton';

interface Props {
  postId: number;
}

const CommentSection: React.FC<Props> = ({ postId }) => {
  const user: User | null = useAppSelector((state) => state.auth.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [comment, setComment] = useState<string>('');
  const token: string = useAppSelector((state) => state.auth.token);
  const [spinIsActive, setSpinIsActive] = useState<boolean>(false);
  const [postComments, setPostComments] = useState<CommentFromDB[]>([]);
  const handleClickOpen = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSpinIsActive(true);
    const getPostComments = await getComments(postId);
    setPostComments([...getPostComments]);
    setSpinIsActive(false);
    setOpen(true);
  };
  const handleCommentAdding = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    if (user) {
      const validationRules: boolean = await commentSchema.isValid({ comment });
      if (validationRules) {
        setLoading(true);
        await addComment(comment, postId, token);
        setComment('');
        setLoading(false);
        ToastNotifySuccess(
          'Your comment has been added check in show Comments',
        );
      } else {
        setLoading(false);
        ToastNotifyError(
          'Something went wrong (remember text is required and must be lower then 200)🤔',
        );
      }
    } else {
      ToastNotifyError('It seems you are not singed In🤔');
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section className='w-full flex justify-center flex-col p-3 mt-3'>
      <form onSubmit={(e) => handleCommentAdding(e)} className='w-full'>
        <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            id='message'
            rows={4}
            className='block p-2.5 shadow-2xl w-full text-sm text-gray-dark bg-gray-50 rounded-lg focus:border-hardBlue border-hardBlue resize-none'
            placeholder='Write your thoughts here...'
          />
          <div className='w-full flex items-center justify-between flex-wrap rounded-lg h-16'>
            <button
              type='button'
              onClick={(e) => handleClickOpen(e)}
              className='w-48 mt-3 bg-hardBlue hover:bg-blue border-2 border-hardBlue text-white-dark  hover:text-white-dark p-1 rounded transition duration-200 ease-in'
            >
              Show Comments
            </button>
            <CoreButton
              text='Add'
              type='submit'
              styleClass='w-32 flex justify-center flex-wrap mt-3 bg-hardBlue  hover:bg-blue border-2 border-hardBlue text-white-dark hover:text-white-dark p-1 rounded transition duration-200 ease-in'
              loading={loading}
            />
          </div>
        </div>
      </form>
      <CommentDialogSection
        postComments={postComments}
        spinIsActive={spinIsActive}
        handleClose={handleClose}
        open={open}
      />
    </section>
  );
};

export default CommentSection;
