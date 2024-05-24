import { 
    SignedOut,
    RedirectToSignIn,
} from '@clerk/nextjs'

import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation'

export default function Login() {
    const { userId } = auth();

    if (!userId) {
        return (
            <div>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </div>
        )
    } else {
        redirect('/app')
    }
};
export const runtime = 'edge';
