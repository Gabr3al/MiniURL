import Link from "next/link"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function NotFound() {
    return(
        <main>
            <header className="shadow mb-2 px-4">
                <div className="relative max-w-screen-lg mx-auto py-4 flex flex-col sm:flex-row sm:justify-between items-center">
                    <Link href="/" className="text-2xl flex items-center font-black ml-2">
                        <span><img src="favicon.ico" alt="" width={32} /></span>
                        <span className="mr-2 ml-2">MiniUrl</span>
                    </Link>

                    <input className="peer hidden" type="checkbox" id="navbar-open"/>
                    <label className="cursor-pointer absolute right-0 text-xl mt-2 sm:hidden" htmlFor="navbar-open">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                    </svg>

                    </label>

                    <nav className="peer-checked:block hidden mt-4 sm:mt-0 sm:block text-center">
                        <ul className="flex sm:gap-x-8 flex-col sm:flex-row gap-y-4">
                            <li className="text-lg"><Link href="/">Home</Link></li>
                            <li className="text-lg"><Link href="/#pricing">Pricing</Link></li>
                            <li className="text-lg">
                                <SignedIn>
                                    <div className="flex">
                                        <Link href="/app" className="mr-4">Dashboard</Link>
                                        <UserButton />
                                    </div>
                                    
                                </SignedIn>
                                <SignedOut>
                                    <Link href="/login" className="rounded-xl border-2 border-green-600 px-6 hover:bg-green-600 hover:text-white transition-all">Sign In</Link>
                                </SignedOut>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <section id="home" className="py-5">
                <div className="container flex flex-wrap items-center justify-center mx-auto mt-10 md:px-12 md:flex-row">
                    <div className="mb-14 lg:mb-0 lg:w-1/2">
                        <h1 className="text-[2.9rem] leading-none text-gray-900 font-extrabold font-sans text-center lg:text-5xl mb-5">Sorry, this URL could not be found</h1>
                        <p className="text-center text-gray-500 text-xl font-semibold">Either this URL does not exist or it got disabled</p>
                        <p className="text-center text-gray-500 text-xl font-semibold">Sign-Up today and start using our Free* URL-Shortener Service</p>
                        <div className="flex justify-center mt-14">
                            <Link href="/login" className="rounded-xl border-2 border-green-600 px-6 py-2 mr-2 font-medium hover:bg-green-600 hover:text-white transition-all">Get Started</Link>
                            <Link href="/" className="rounded-xl border-2 border-green-600 px-6 py-2 ml-4 font-medium hover:bg-green-600 hover:text-white transition-all">Home</Link>
                        </div>
                        <p className="text-center text-gray-500 text-lg py-4">*Premium features available</p>
                    </div>
                </div>
            </section>
        </main>
    )
};