import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../Hooks/hook";
import {User} from "../types/typeSection";
import {logOut} from "../Service/firebase/userAuth";
import {userLogOut} from "../Redux/Store/auth/authSlice";
export default function Header() {
    const user:User | null = useAppSelector(state => state.auth.auth)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false)
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
        <header className="bg-white border-b-2 border-hardBlue">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1 max-sm:hidden" >
                    <Link to="/" className="-m-1.5 p-1.5 border-solid border-2 border-hardBlue">
                        <span className="sr-only">Test Project</span>
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </Link>
                </div>
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
                    <Link to="/feaders" className="hover:underline-offset-3 decoration-hardBlue text-sm font-semibold leading-6 text-gray-900">
                                Feader
                    </Link>

                    <Link to="/posts" className="text-sm font-semibold leading-6 text-gray-900">
                        Posts
                    </Link>

                    <Link to="/Profile" className="text-sm font-semibold leading-6 text-gray-900">
                        Profile
                    </Link>
                </Popover.Group>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link to="/signIn" className="text-sm font-semibold leading-6 text-gray-900 mr-3">
                        Sign in
                    </Link>
                    {user &&
                        <>
                            <span>/</span>
                            <button onClick={() => handleSignOut()} className="text-sm font-semibold leading-6 text-red ml-3">
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
                                <Link
                                    to="/signIn"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Sing In
                                </Link>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}
