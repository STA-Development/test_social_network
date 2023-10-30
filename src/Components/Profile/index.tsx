import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import React, { useState } from 'react';
import { Oval } from 'react-loader-spinner';
import { User } from '../../types/typeSection';
import { changeUserAvatar } from '../../Service/User/RequestsForUsers';

const ProfileSection: React.FC<{ user: User }> = ({ user }) => {
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  const [userCredential, setUserCredential] = useState({ ...user });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleAvatarChange = async (element: FileList | null) => {
    if (element) {
      setIsLoading(true);
      const data: FormData = new FormData();
      data.append('file', element[0]);
      const url: string = await changeUserAvatar(data);
      setIsLoading(false);
      setUserCredential({ ...userCredential, picture: url });
    }
  };
  return (
    <div className='w-full mb-3'>
      <section className='w-72 sm:w-80 min-h-96 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg'>
        <div className='mt-6 w-fit mx-auto'>
          {isLoading ? (
            <div className='w-full flex justify-center items-center'>
              <Oval
                height={160}
                width={160}
                color='#1f66ff'
                wrapperStyle={{}}
                wrapperClass=''
                visible
                ariaLabel='oval-loading'
                secondaryColor='#1f66ff'
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            </div>
          ) : (
            <img
              className='w-52 h-52 rounded-full'
              src={userCredential?.picture || ''}
              alt=''
              referrerPolicy='no-referrer'
            />
          )}
        </div>
        <div className='w-full flex justify-center mt-3'>
          <Button
            color='primary'
            component='label'
            variant='contained'
            sx={{ bgcolor: '#4D4C7D', '&:hover': { bgcolor: '#363062' } }}
            startIcon={<FileUploadIcon />}
          >
            Upload image
            <VisuallyHiddenInput
              type='file'
              onChange={(e) => handleAvatarChange(e.target.files)}
            />
          </Button>
        </div>
        <div className='mt-8 text-center'>
          <h2 className='text-white font-bold text-xl tracking-wide'>
            {userCredential.name}
          </h2>
        </div>
        <div className='h-1 w-full bg-black mt-8 rounded-full'>
          <div className='h-1 rounded-full w-2/5 bg-yellow-500 ' />
        </div>
        <div className='mt-3 text-white text-sm' />
      </section>
    </div>
  );
};

export default ProfileSection;
