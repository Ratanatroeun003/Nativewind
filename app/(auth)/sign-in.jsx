import { useSignIn } from '@clerk/expo'
import { Link, useRouter } from 'expo-router'
import { styled } from 'nativewind'
import React from 'react'
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'
export default function Page() {
    const SafeAreaView = styled(RNSafeAreaView)
    const { signIn, errors, fetchStatus } = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [code, setCode] = React.useState('')

    const isFetching = fetchStatus === 'fetching'

    const handleSubmit = async () => {
        const { error } = await signIn.password({
            emailAddress,
            password,
        })

        if (signIn.status === 'complete') {
            await signIn.finalize({
                navigate: ({ decorateUrl }) => {
                    const url = decorateUrl('/')
                    router.push(url)
                },
            })
        } else if (signIn.status === 'needs_client_trust') {
            const emailCodeFactor = signIn.supportedSecondFactors.find(
                (factor) => factor.strategy === 'email_code',
            )
            if (emailCodeFactor) await signIn.mfa.sendEmailCode()
        }
    }

    const handleVerify = async () => {
        await signIn.mfa.verifyEmailCode({ code })
        if (signIn.status === 'complete') {
            await signIn.finalize({
                navigate: ({ decorateUrl }) => {
                    router.push(decorateUrl('/'))
                },
            })
        }
    }

    const isSignInDisabled = !emailAddress || !password || isFetching

    // --- ទិដ្ឋភាពពេលផ្ទៀងផ្ទាត់ MFA (MFA Verification View) ---
    if (signIn.status === 'needs_client_trust') {
        return (
            <SafeAreaView>

                <Text className="text-foreground text-3xl font-sans-bold mb-2">Verify your account</Text>

                <Text className="text-auth-label">Verification Code</Text>
                <TextInput
                    className='bg-card border border-border text-foreground px-4 py-4 mb-2 rounded-2xl font-sans-medium focus:border-primary'
                    value={code}
                    placeholder="Enter code"
                    placeholderTextColor="#64748b"
                    onChangeText={setCode}
                    keyboardType="numeric"
                />
                {errors.fields.code && <Text className="text-auth-error">{errors.fields.code.message}</Text>}

                <Pressable
                    onPress={handleVerify}
                    disabled={isFetching}
                    className={`bg-primary py-4 rounded-2xl items-center justify-center mb-2 shadow-md shadow-primary/20 ${isFetching ? 'opacity-50' : 'active:opacity-80'}`}
                >
                    {isFetching ? <ActivityIndicator color="white" /> : <Text className="text-white font-sans-bold text-lg">Verify</Text>}
                </Pressable>

                <Pressable className="mt-6 items-center" onPress={() => signIn.mfa.sendEmailCode()}>
                    <Text className="text-blue-500 font-sans-medium">I need a new code</Text>
                </Pressable>

                <Pressable className="mt-4 items-center" onPress={() => signIn.reset()}>
                    <Text className="text-slate-400">Start over</Text>
                </Pressable>

            </SafeAreaView>
        )
    }

    // --- ទិដ្ឋភាពពេល Sign In (Initial Sign In View) ---
    return (
        <SafeAreaView className='bg-background flex-1'>
            <View className='auth-container'>
                <Text className="text-auth-title">Sign In</Text>

                <Text className="text-auth-label">Email address</Text>
                <TextInput
                    className='auth-input'
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="name@example.com"
                    placeholderTextColor="#64748b"
                    onChangeText={setEmailAddress}
                    keyboardType="email-address"
                />
                {errors.fields.identifier && <Text className="text-auth-error">{errors.fields.identifier.message}</Text>}

                <Text className="text-auth-label">Password</Text>
                <TextInput
                    className='auth-input'
                    value={password}
                    placeholder="Enter password"
                    placeholderTextColor="#64748b"
                    secureTextEntry
                    onChangeText={setPassword}
                />
                {errors.fields.password && <Text className="text-auth-error">{errors.fields.password.message}</Text>}
                <Pressable
                    onPress={handleSubmit}
                    disabled={isSignInDisabled}
                    className={`auth-button ${isSignInDisabled ? 'auth-button-disabled' : 'active:opacity-80'}`}
                >
                    {isFetching ? <ActivityIndicator color="white" /> : <Text className="text-white font-sans-bold text-lg">Continue</Text>}
                </Pressable>

                <View className='auth-link-row'>
                    <Text className="text-slate-400">Don't have an account? </Text>
                    <Link href="/sign-up">
                        <Text className="text-blue-500 font-sans-bold">Sign up</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    )
}