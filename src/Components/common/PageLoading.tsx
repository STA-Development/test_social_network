import React from 'react';
import {Oval} from 'react-loader-spinner';

const PageLoading = () => {
	return (
		<div className='w-screen h-screen flex justify-center items-center bg-white z-10'>
			<Oval
				height={160}
				width={160}
				color="#1f66ff" 
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
				ariaLabel='oval-loading'
				secondaryColor="#1f66ff"
				strokeWidth={2}
				strokeWidthSecondary={2}
			/>
		</div>
	);
};

export default PageLoading;