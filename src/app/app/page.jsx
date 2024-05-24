import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation'

import DashboardNavbar from '@/components/DashboardNavbar';
import GetPremium from '@/components/GetPremium';
import CreateLink from '@/components/CreateLink';

export default function Login() {
    const { userId } = auth();

    if (!userId) {
       redirect('/login')
    }

    return (
        <main>
            <DashboardNavbar />
            <div className="mx-auto max-w-5xl gap-8 py-5 px-4 sm:px-6">

                <div className='flex justify-between'>
                    <h1 className="text-5xl font-bold">My Links</h1>
                    <GetPremium />
                </div>

                <CreateLink />
                
            </div>
        </main>
    )


};