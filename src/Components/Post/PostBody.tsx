import React from 'react';

interface Props {
  title: string;
  photo: string;
  description: string;
}
const PostBody = ({ title, photo, description }: Props) => {
  return (
    <div>
      <div>
        <h1 className='text-2xl border-b-2 mb-3 border-hardBlue text-hardBlue'>
          Title:
        </h1>
        <p className='text-left text-2xl mb-3 '>{title}:</p>
      </div>
      {photo && (
        <div className='flex h-full w-full bg-blue-400 justify-center items-center'>
          <img className='object-cover h-48' src={photo} alt='' />
        </div>
      )}

      <div className='mt-5 mb-3'>
        <p className='text-left border-b-2 mb-3 border-hardBlue text-hardBlue'>
          description:
        </p>
        <p className='text-left text-base '>{description}</p>
      </div>
    </div>
  );
};

export default PostBody;
