import Link from "next/link";

import { 
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

export default function Home() {

  const year = new Date().getFullYear();

  return (
    <main>
        <header className="shadow mb-2 px-4">
            <div className="relative max-w-screen-lg mx-auto py-4 flex flex-col sm:flex-row sm:justify-between items-center">
                <Link href="#home" className="text-2xl flex items-center font-black ml-2">
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
                        <li className="text-lg"><Link href="#about">Home</Link></li>
                        <li className="text-lg"><Link href="#pricing">Pricing</Link></li>
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
                    <h1 className="text-[2.9rem] leading-none text-gray-900 font-extrabold font-sans text-center lg:text-5xl mb-5">Simplify URL-Shorting with MiniURL</h1>
                    <p className="text-center text-gray-500 text-xl font-semibold">Sign-Up today and start using our Free* URL-Shortener Service</p>
                    <div className="flex justify-center mt-14">
                        <Link href="/login" className="rounded-xl border-2 border-green-600 px-6 py-2 mr-2 font-medium hover:bg-green-600 hover:text-white transition-all">Get Started</Link>
                        <Link href="#pricing" className="rounded-xl border-2 border-green-600 px-6 py-2 ml-4 font-medium hover:bg-green-600 hover:text-white transition-all">Pricing</Link>
                    </div>
                    <p className="text-center text-gray-500 text-lg py-4">*Premium features available</p>
                </div>
            </div>
        </section>

        <section id="pricing">
            <h2 className="text-center text-[2rem] leading-none text-gray-900 font-extrabold font-sans mt-5">Pricing</h2>

            <div className="mx-auto grid max-w-5xl sm:grid-cols-2 grid-cols-1 gap-8 py-24 px-4 sm:px-6">
                <div className="border border-slate-200 p-8 shadow-lg rounded-2xl">
                    <h3 className="text-lg font-extrabold leading-5">Free</h3>
                    <p className="mt-4 text-md leading-6 text-slate-700">Free Plan for MiniURL. All Basic Features</p>

                    <div className="-mx-6 mt-4 rounded-lg bg-slate-50 p-6">
                        <p className="flex items-center text-sm font-semibold text-slate-500">
                            <span>€</span>
                            <span className="ml-3 text-4xl text-slate-900">0</span>
                            <span className="ml-1.5">/ lifetime</span>
                        </p>
                    </div>

                    <ul className="mt-6 space-y-4">
                    

                        <li className="text-sm text-slate-700 leading-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                          </svg>
                            <span className="ml-2">10 Links</span>
                        </li>

                        <li className="text-sm text-slate-700 leading-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                          </svg>
                            <span className="ml-2">Delete, Edit and Disable Links</span>
                        </li>

                        <li className="text-sm text-slate-700 leading-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                          </svg>
                            <span className="ml-2">Free Forever</span>
                        </li>

                        <li className="text-sm text-slate-700 leading-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-600">
                              <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
                            </svg>

                            <span className="ml-2">Custom Links</span>

                        </li>
                    </ul>
                    <div className="mt-8"/>

                    <Link href="/login" className="rounded-xl border-2 border-green-600 block text-center py-2 mr-2 font-medium hover:bg-green-600 hover:text-white transition-all">Get Started</Link>


                </div>

                <div className="border border-slate-200 p-8 shadow-lg rounded-2xl">
                    <h3 className="text-lg font-extrabold leading-5">Pro <span className="ml-16 font-bold text-green-600 border-2 rounded-full py-1 px-2">Most Popular</span></h3>
                    <p className="mt-4 text-md leading-6 text-slate-700">Best Plan for MiniURL. <span className="font-bold">One-Time Payment</span> Best Features</p>

                    <div className="-mx-6 mt-4 rounded-lg bg-slate-50 p-6">
                        <p className="flex items-center text-sm font-semibold text-slate-500">
                            <span>€</span>
                            <span className="ml-3 text-4xl text-slate-900">9</span>
                            <span className="ml-1.5">/ lifetime</span>
                        </p>
                    </div>

                    <ul className="mt-6 space-y-4">
                    

                        <li className="text-sm text-slate-700 leading-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                          </svg>
                            <span className="ml-2"><span className="font-bold">Unlimited</span> Links</span>
                        </li>

                        <li className="text-sm text-slate-700 leading-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                          </svg>
                            <span className="ml-2">Delete, Edit and Disable Links</span>
                        </li>

                        <li className="text-sm text-slate-700 leading-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600">
                              <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                          </svg>
                            <span className="ml-2">One Time Payment</span>
                        </li>

                        <li className="text-sm text-slate-700 leading-6 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-600">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                            </svg>

                            <span className="ml-2 font-bold">Custom Links</span>

                        </li>
                    </ul>
                    <div className="mt-8"/>
                    <Link href="/login-checkout-redirect" className="rounded-xl border-2 border-green-600 block text-center py-2 mr-2 font-medium hover:bg-green-600 hover:text-white transition-all">Get Started</Link>
                </div>
            </div>
        </section>

        <footer className="footer footer-center  w-full p-4 bg-gray-100 text-gray-800">
          <div className="text-center">
            <p>
              Copyright © {year} -
              <Link className="font-semibold" href="#home"
                >MiniURL</Link>
            </p>
          </div>
        </footer>
        

        
        
    </main>
  );
}

export const runtime = 'edge';