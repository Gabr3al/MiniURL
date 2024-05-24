import { SignedIn, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import Username from '@/components/Username';

export default function DashboardNavbar(params) {
    return (
        <header className="shadow mb-2 px-4">
            <div className="relative max-w-screen-lg mx-auto py-4 flex flex-col sm:flex-row sm:justify-between items-center">
                <Link href="#" className="text-2xl flex items-center font-black ml-2">
                    <span><img src="favicon.ico" alt="" width={32} /></span>
                    <span className="mr-2 ml-2">Dashboard</span>
                </Link>

                <input className="peer hidden" type="checkbox" id="navbar-open"/>
                <label className="cursor-pointer absolute right-0 text-xl mt-2 sm:hidden" htmlFor="navbar-open">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                </svg>

                </label>

                <nav className="peer-checked:block hidden mt-4 sm:mt-0 sm:block text-center">
                    <ul className="flex sm:gap-x-8 flex-col sm:flex-row gap-y-4">
                        <li className="text-lg">
                            <SignedIn>
                                <div className="flex">
                                    <Username />
                                    <UserButton />
                                </div>
                                
                            </SignedIn>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
};
