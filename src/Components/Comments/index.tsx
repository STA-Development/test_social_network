import React, { useState } from 'react';
import { useFormik } from 'formik';
import CommentDialogSection from './CommentDialogSection';
import { addComment, getComments } from '../../Service/User/RequestsForUsers';
import { useAppSelector } from '../../Hooks/hook';
import { commentSchema } from '../../validator';
import { ToastNotifyError, ToastNotifySuccess } from '../../Helpers';
import { CommentFromDB, User } from '../../types/typeSection';
import CoreButton from '../common/CoreButton';

interface Props {
  postId: number;
}

const CommentSection: React.FC<Props> = ({ postId }) => {
  const user: User | null = useAppSelector((state) => state.auth.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
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
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: commentSchema,
    onSubmit: async (): Promise<void> => {
      if (user) {
        try {
          setLoading(true);
          await addComment(formik.values.comment, postId);
          setLoading(false);
          formik.values.comment = '';
          ToastNotifySuccess(
            'Your comment has been added check in show Comments',
          );
        } catch (error) {
          if (error instanceof Error) {
            ToastNotifyError(formik.errors.comment);
          }
        }
      } else {
        setLoading(false);
        ToastNotifyError("It seems you haven't sign in yet");
      }
    },
  });
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <section className='w-full flex justify-center flex-col mt-3'>
      <form onSubmit={formik.handleSubmit} className='w-full'>
        <div>
          {formik.errors.comment && (
            <p className='text-bright-red'>{formik.errors.comment}</p>
          )}
          <textarea
            id='message'
            name='comment'
            rows={4}
            className='block p-2.5 shadow-2xl w-full text-sm text-gray-dark bg-gray-50 rounded-lg focus:border-hardBlue border-hardBlue resize-none'
            placeholder='Write your thoughts here...'
            onChange={formik.handleChange}
            value={formik.values.comment}
          />
          <div className='w-full h-full flex items-center justify-between sm:items-center flex-wrap rounded-lg'>
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
