import { useAuth, useUser } from '@clerk/expo'; // បន្ថែម useUser ដើម្បីយកព័ត៌មាន User
import { Redirect, Stack } from 'expo-router';
import { usePostHog } from 'posthog-react-native'; // បន្ថែមនេះ
import { useEffect } from 'react';

export default function AuthRoutesLayout() {
    const { isSignedIn, isLoaded } = useAuth()
    const { user } = useUser() // យកព័ត៌មាន user ពី Clerk
    const posthog = usePostHog() // ហៅប្រើ PostHog

    useEffect(() => {
        if (isLoaded && isSignedIn && user && posthog) {
            posthog.identify(user.id, {
                email: user.primaryEmailAddress?.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName,
                createdAt: user.createdAt,
            })
        }
    }, [isSignedIn, isLoaded, user, posthog]) // ឱ្យវាដើររាល់ពេលស្ថានភាព Login ប្តូរ

    if (!isLoaded) {
        return null
    }

    if (isSignedIn) {
        return <Redirect href={'/(dashboard)'} />
    }

    return <Stack />
}