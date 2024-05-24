"use client"

import { useUser } from "@clerk/nextjs"

export default function Username() {
    const { isLoaded, isSignedIn, user } = useUser()
    
    if(!isLoaded || !isSignedIn) {
        return "Loading..."
    }

    return (
        <span className="mr-4">Hello, {user.firstName}</span>
    )
};
