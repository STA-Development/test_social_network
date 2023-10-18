import React, {useState} from 'react';
import Header from '../Components/Header';
import {Link,useNavigate} from 'react-router-dom';
import {signUpSchema} from '../validator';
import {useFormik} from 'formik';
import {ToastContainer} from 'react-toastify';
import {createUser} from '../Service/firebase/userAuth';
import {SignUpValues} from '../types/typeSection';
import CoreButton from '../Components/common/CoreButton';
import {ToastNotifyError} from '../Helpers';
import {userAuth} from '../Redux/Store/auth/authSlice';
import {useAppDispatch} from '../Hooks/hook';

const SignUp = () => { 
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const formik = useFormik({
		initialValues:{
			username: '',
			email:'',
			password:''
		},
		validationSchema:signUpSchema,
		onSubmit: async ({...values}:SignUpValues):Promise<void> => {
			try {
				setLoading(true);
				const user = await createUser(values.email,values.password,values.username);
				console.log(user);
				if(user){
					dispatch(userAuth({
						uId: user.uid,
						name: user.displayName,
						email: user.email,
						picture: user.photoURL
					}));
					navigate('/Profile');
				}
				setLoading(false);
			}catch(err:any){
				setLoading(false);
				ToastNotifyError(err.message);
				console.error(err.message);
			}
		}
	});
	return (
		<>
			<Header />
			<div>
				<div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<div className="w-full flex justify-center items-center">
							<div className="w-14 p-1 border-2 border-orange">
								<Link to="/" >
									<img
										className="mx-auto h-10 w-auto"
										src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
										alt="Your Company"
									/>
								</Link>
							</div>
							<h1 className='ml-3'><span className='text-purple'>Connect<span className='text-orange'>Hub</span></span></h1>
						</div>
						<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Create new account on Test project
						</h2>
					</div>
					<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
						<form onSubmit={formik.handleSubmit} className="space-y-6" action="#" method="POST">
							<div>
								<label htmlFor="username" className="block leading-6 text-left text-sm font-medium text-gray-900">
                                    UserName:
								</label>
								<div className="mt-2">
									{formik.errors.username &&
                                        <p className='text-red'>{formik.errors.username}</p>
									}
									<input
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										name="username"
										id="username"
										type="text"
										placeholder="input your firstname"
										onChange={formik.handleChange}
										value = {formik.values.username}
									/>

								</div>
							</div>

							<div>
								<label htmlFor="email" className="block text-left text-sm font-medium leading-6 text-gray-900">
                                    Email address:
								</label>
								<div className="mt-2">
									{formik.errors.email &&
                                        <p className='text-red'>{formik.errors.email}</p>
									}
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										placeholder="input your firstname"
										onChange={formik.handleChange}
										value = {formik.values.email}
									/>
								</div>
							</div>

							<div>
								<div className="flex items-center justify-between">
									<label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password:
									</label>
								</div>
								<div className="mt-2">
									{formik.errors.password &&
                                        <p className='text-red'>{formik.errors.password}</p>
									}
									<input
										placeholder="input password: ••••••••"
										id="password"
										name="password"
										type="password"
										autoComplete="current-password"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										onChange = {formik.handleChange}
										value = {formik.values.password}
									/>
								</div>
							</div>
							<div>

								<CoreButton
									text='Sign up'
									loading={loading}
									styleClass={'w-full flex justify-center bg-hardBlue hover:bg-blue border-2 border-hardBlue text-white-dark hover:text-gray-dark p-2 rounded transition duration-200 ease-in'}
								/>
							</div>
							<div className='mt-5 flex flex-col justify-center items-center'>
								<div className='mt-6'>
									<p className='text-center text-gray-dark'>
                                        Already have an account?  <Link to='/signIn' className='text-orange hover:text-hardBlue transition duration-200 ease-in'>Go and sign In!</Link>
									</p>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	);
};

export default SignUp;