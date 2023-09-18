import React, {useState} from "react";
import Header from "../Components/Header";
import {Link,useNavigate,useNavigation} from "react-router-dom";
import { createUser} from "../Service/firebase/userAuth";
import {useAppDispatch} from "../Hooks/hook";
import {Puff} from "react-loader-spinner";
import {Alert} from "@mui/material";
import {userAuth} from "../Redux/Store/auth/authSlice";
import {getAuth, onAuthStateChanged} from "firebase/auth";

const SignUp = () => {
    const navigate = useNavigate()
    const navigation = useNavigation()
    const [userName, setUserName] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")
    const [errorMessage, setErrorMessage] = useState<string>("")
    const dispatch = useAppDispatch()

    // https://stackoverflow.com/questions/60635093/react-formeventhtmlformelement-form-input-props-types
    const SignUp = async (e: React.FormEvent<HTMLFormElement>):Promise<void> => {
        e.preventDefault()
        setErrorMessage("")
        try {
            const user = await createUser(email,password,userName)
            const auth = getAuth();
            console.log(auth.currentUser?.uid, 222)
            console.log(user)
            // dispatch(userAuth(user))
            navigate("/feaders")
        }catch (e:any) {
            setErrorMessage(e.message)
            console.log(e.message)
        }
    }
    return (
        <>
            <Header />
            {/* TODO: make loading spinner */}
            {   navigation.state === "loading" &&
                <Puff
                    height="80"
                    width="80"
                    radius={1}
                    color="#4fa94d"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            }
            <div>
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
                            Create new account on Test project
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        {errorMessage &&
                            <Alert className="!transition ease-in duration-200" severity="error">{errorMessage}</Alert>
                        }
                        <form onSubmit={(e)=> SignUp(e)} className="space-y-6" action="#" method="POST">
                            <div>
                                <label htmlFor="username" className="block leading-6 text-left text-sm font-medium text-gray-900">
                                    UserName:
                                </label>
                                <div className="mt-2">
                                    <input
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        name="username"
                                        id="username"
                                        type="text"
                                        placeholder="input your firstname"
                                        onChange ={(e) => setUserName(e.target.value)}
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
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
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
                            <div className="mt-10 text-center text-sm text-gray-500">
                                you are already a member? then {' '}
                                <p  className="mt-3 font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                                    <Link to="/signIn" className="cursor-pointer text-hardBlue underline decoration-hardBlue">
                                        <button
                                            type="button"
                                            className = "min-w-4 mx-3 bg-hardBlue hover:bg-blue border-2 border-hardBlue text-white-dark hover:text-gray-dark p-1 rounded transition duration-200 ease-in"
                                        >
                                            sign in
                                        </button>
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp