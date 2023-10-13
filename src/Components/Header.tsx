import React, {  useState } from 'react'
import { Dialog, Popover } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../Hooks/hook";
import {User} from "../types/typeSection";
import {logOut} from "../Service/firebase/userAuth";
import {userLogOut} from "../Redux/Store/auth/authSlice";
import { useSpring, animated } from 'react-spring'
export default function Header() {
    const user:User | null = useAppSelector(state => state.auth.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
    const styles = useSpring({
        from: { opacity: "0" },
        to: { opacity: "1" },
        config: { duration: 2000 },
    })
    const handleSignOut = async(): Promise<void> => {
        try {
            const out = await logOut()
            dispatch(userLogOut())
            console.log("Log out")
            navigate("/")
        }catch(e:any){
            console.log(e.message)
        }
    }
    return (
        <header className="bg-hardBlue border-b-2 border-orange text-gray">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <animated.div style={styles} className="flex lg:flex-1 max-sm:hidden items-center" >
                    <Link to="/" className="-m-1.5 p-1.5 border-solid border-2 border-orange">
                        <span className="sr-only">Connect Hub</span>
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </Link>
                    <div className='ml-3'><Link to="/" className='text-white'>Connect<span className='text-orange'>Hub</span></Link></div>
                </animated.div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        {!mobileMenuOpen? <Bars3Icon className="h-6 w-6" aria-hidden="true"/> : ""}
                    </button>
                </div>
                <Popover.Group className="hidden lg:flex lg:gap-x-12">
                    <div className='transition duration-200 ease-in hover:text-orange'>
                        <Link to="/feaders" className="hover:underline-offset-3 decoration-hardBlue text-sm font-semibold leading-6 text-gray-900 ">
                            Feader
                        </Link>
                    </div>
                    <div className='transition duration-200 ease-in hover:text-orange'>
                        <Link to="/posts" className="text-sm font-semibold leading-6 text-gray-900">
                            Posts
                        </Link>
                    </div>
                    <div className='transition duration-200 ease-in hover:text-orange'>
                        <Link to="/Profile" className="text-sm font-semibold leading-6 text-gray-900">
                            Profile
                        </Link>
                    </div>
                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {!user &&
                        <Link to="/signIn" className="text-sm font-semibold leading-6 text-gray-900 mr-3">
                            Sign in
                        </Link>
                    }
                    {user &&
                        <>
                            <button onClick={() => handleSignOut()} className="text-sm font-semibold text-bright-red underline p-1 leading-6 ml-3">
                                Sign Out
                            </button>
                        </>
                    }
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="bg-gray bg-opacity-60 fixed inset-y-0  right-0 z-10 w-full md:w-auto overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="-m-1.5 p-1.5 border-2 border-hardBlue mx-1">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                                alt=""
                            />
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Link
                                    to="/feaders"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Feader
                                </Link>
                                <Link
                                    to="/posts"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Posts
                                </Link>
                                <Link
                                    to="/Profile"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Profile
                                </Link>

                            </div>
                            <div className="py-6">
                                {!user &&
                                    <Link
                                        to="/signIn"
                                        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        Sing In
                                    </Link>
                                }
                                {user &&
                                    <>
                                        <button onClick={() => handleSignOut()} className="text-sm font-semibold leading-6  text-bright-red ml-3">
                                            Sign Out
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
