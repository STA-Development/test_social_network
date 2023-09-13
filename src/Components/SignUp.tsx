import React, {useState} from "react";
import firebaseAuth from "../Firebase"
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth";

const SignUp = () => {
    // console.log(firebaseAuth)
    // console.log(getAuth)
    const [userInfo, setUserInfo] = useState<{
        firstname: string,
        lastname: string,
        email: string,
        password: string,
    }>({
        firstname:"",
        lastname:"",
        email:"",
        password: ""
    });
    // console.log(userInfo)
    const getSignUp = (e:any) => {
        e.preventDefault()
        const auth = getAuth();
        console.log(userInfo.email, userInfo.password)
        createUserWithEmailAndPassword(auth, userInfo.email, userInfo.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage)
                // ..
            });
        // if(userInfo.firstname.trim() !== ""){
        //
        // }
    }
    return (
        <div>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="w-full flex justify-center">
                        <div className="w-14 p-1 border-2 border-hardBlue">
                            <a href="#" >
                                <img
                                    className="mx-auto h-10 w-auto"
                                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                    alt="Your Company"
                                />
                            </a>
                        </div>
                    </div>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create new account on Test project
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={(e)=> getSignUp(e)} className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="firstname" className="block leading-6 text-left text-sm font-medium text-gray-900">
                                FirstName:
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    name="firstname"
                                    id="firstname"
                                    type="text"
                                    placeholder="input your firstname"
                                    onChange ={(e) => setUserInfo({...userInfo, firstname:e.target.value} )}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="lastname" className="block leading-6 text-left text-sm font-medium text-gray-900">
                                LastName:
                            </label>
                            <div className="mt-2">
                                <input
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    name="firstname"
                                    id="lastname"
                                    type="text"
                                    placeholder="input your lastname"
                                    onChange = {(e) => setUserInfo({...userInfo, lastname:e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-left text-sm font-medium leading-6 text-gray-900">
                                Email address:
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    placeholder="input your firstname"
                                    onChange={(e) => setUserInfo({...userInfo,email: e.target.value})}
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
                                <input
                                    placeholder="input password: ••••••••"
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={(e) => setUserInfo({...userInfo, password:e.target.value})}
                                />
                            </div>
                        </div>
                        <div className="mt-10 text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <p  className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                then sign in <a href="#" className="cursor-pointer text-hardBlue underline decoration-hardBlue">here</a>
                            </p>
                        </div>
                        <div>
                            <button
                                type="submit"
                                // className = "bg-hardBlue hover:bg-blue text-white-dark font-bold py-2 px-4 border-b-4 border-hardBlue hover:border-hardBlue rounded"
                                className = "w-full bg-hardBlue hover:bg-blue border-2 border-hardBlue text-white-dark hover:text-gray-dark p-2 rounded transition duration-200 ease-in"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp