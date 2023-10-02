import React, {useState} from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import Header from "../Components/Header";
import {authWithGoogle, signIn} from "../Service/firebase/userAuth";
import {Link, useNavigate} from "react-router-dom";
import {Alert} from "@mui/material";

const SignIn = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const handleSignIn = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const singIn =  await signIn(email,password)
            setErrorMessage("")
            navigate("/Profile")
        }catch(e:any) {
            console.error(e.message)
            setErrorMessage(e.message)
        }
    }
    const handleGoogleAuth = async (): Promise<void> => {
        try {
            const googleAuthUser = await authWithGoogle()
            navigate("/profile")
        }catch(error:any) {
            console.error(error.message)
        }
    }

    return (
        <>
            <Header />
            <div className='h-screen'>
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="w-full flex justify-center">
                            <div className="w-14 p-1 border-2 border-hardBlue">
                                <Link to="/" >
                                    <img
                                        className="mx-auto h-10 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                        alt="Your Company"
                                    />
                                </Link>
                            </div>
                        </div>
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <div className="w-full mt-3 flex items-center justify-center">
                            <button
                                type="button"
                                onClick={()=> handleGoogleAuth()}
                                className="flex items-center p-3 border-2 border-hardBlue hover:bg-soft-blue transition duration-200 ease-in "
                            >
                                <GoogleIcon />
                                <p className="ml-3">Sign in With Google</p>
                            </button>
                        </div>
                        <div className="flex items-center w-full mt-14">
                            <hr className="flex-grow border-t border-gray-300"/>
                            <span className="px-3 text-sm">Create Account with Google</span>
                            <hr className="flex-grow border-t border-gray-300"/>
                        </div>
                    </div>
                        {/*<form onSubmit={(e)=> handleSignIn(e)} className="space-y-6" action="#" method="POST">*/}
                        {/*    <div>*/}
                        {/*        {errorMessage &&*/}
                        {/*            <Alert className="!transition ease-in duration-200" severity="error">{errorMessage}</Alert>*/}
                        {/*        }*/}
                        {/*    </div>*/}
                        {/*    <div>*/}
                        {/*        <label htmlFor="email" className="block text-left text-sm font-medium leading-6 text-gray-900">*/}
                        {/*            Email address:*/}
                        {/*        </label>*/}
                        {/*        <div className="mt-2">*/}
                        {/*            <input*/}
                        {/*                onChange ={(e)=> setEmail(e.target.value)}*/}
                        {/*                id="email"*/}
                        {/*                name="email"*/}
                        {/*                type="email"*/}
                        {/*                autoComplete="email"*/}
                        {/*                required*/}
                        {/*                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*    <div>*/}
                        {/*        <div className="flex items-center justify-between">*/}
                        {/*            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">*/}
                        {/*                Password:*/}
                        {/*            </label>*/}

                        {/*        </div>*/}
                        {/*        <div className="mt-2">*/}
                        {/*            <input*/}
                        {/*                onChange ={(e)=> setPassword(e.target.value)}*/}
                        {/*                id="password"*/}
                        {/*                name="password"*/}
                        {/*                type="password"*/}
                        {/*                autoComplete="current-password"*/}
                        {/*                required*/}
                        {/*                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"*/}
                        {/*            />*/}
                        {/*        </div>*/}
                        {/*    </div>*/}

                        {/*    <div>*/}
                        {/*        <button*/}
                        {/*            type="submit"*/}
                        {/*            className = "w-full bg-hardBlue hover:bg-blue border-2 border-hardBlue text-white-dark hover:text-gray-dark p-2 rounded transition duration-200 ease-in"*/}
                        {/*        >*/}
                        {/*            Sign in*/}
                        {/*        </button>*/}
                        {/*    </div>*/}
                        {/*</form>*/}
                </div>
            </div>
        </>
    );
}

export default SignIn;