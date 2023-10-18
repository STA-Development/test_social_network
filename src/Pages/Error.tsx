import React from 'react';
import {Link} from 'react-router-dom';

type Message = {
    message: string | null,
    unAuth?: boolean
}
const Error = ({message,unAuth}:Message) => {
	return (
		<>
			{!unAuth?
				<main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
					<div className="text-center">
						<p className="text-base font-semibold text-indigo-600">404</p>
						<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
						{message
							? <p className="mt-6 text-base leading-7 text-gray-600">{message} <Link to="/signIn"><span className="text-hardBlue">Go And SignIn</span></Link></p>
							: <p className="mt-6 text-base leading-7 text-gray-600">Ooooops... Sorry, we couldn’t find the page you’re looking for.</p>
						}
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<a href="/" className="rounded-md transition ease-in duration-200 bg-hardBlue px-3.5 py-2.5 text-sm font-semibold text-white-dark shadow-sm hover:bg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hardBlue">Go back home</a>
						</div>
					</div>
				</main>
				:
				<main className="grid w-full h-screen place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
					<div className="text-center">
						<h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">It seems you are not authorized</h1>
						<p className="mt-6 text-base leading-7 text-gray-600">{message}</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Link to="/signIn" className="rounded-md transition ease-in duration-200 bg-hardBlue px-3.5 py-2.5 text-sm font-semibold text-white-dark shadow-sm hover:bg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hardBlue">
                                Sign In
							</Link>
						</div>
					</div>
				</main>
			}
		</>
	);
};

export default Error;