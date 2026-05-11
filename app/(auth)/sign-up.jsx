import { useAuth, useSignUp } from '@clerk/expo'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { ActivityIndicator, Pressable, SafeAreaView, Text, TextInput, View } from 'react-native'

export default function Page() {
    const { signUp, errors, fetchStatus } = useSignUp()
    const { isSignedIn } = useAuth()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [code, setCode] = React.useState('')

    const isLoading = fetchStatus === 'fetching';

    const handleSubmit = async () => {
        const { error } = await signUp.password({ emailAddress, password })
        if (!error) await signUp.verifications.sendEmailCode()
    }

    const handleVerify = async () => {
        await signUp.verifications.verifyEmailCode({ code })
        if (signUp.status === 'complete') {
            await signUp.finalize({
                navigate: ({ session, decorateUrl }) => {
                    const url = decorateUrl('/')
                    router.push(url)
                },
            })
        }
    }

    if (signUp.status === 'complete' || isSignedIn) return null

    // ទំព័រផ្ទៀងផ្ទាត់លេខកូដ (Verification View)
    if (signUp.status === 'missing_requirements' &&
        signUp.unverifiedFields.includes('email_address') &&
        signUp.missingFields.length === 0) {
        return (
            <SafeAreaView className='auth-screen'>
                <View className='px-6 justify-center'>
                    <Text className='text-foreground text-3xl font-sans-bold mb-2'>Verify Email</Text>
                    <Text className='text-slate-400 mb-4'>We've sent a code to your email.</Text>

                    <TextInput
                        className='bg-card border border-border text-foreground px-4 py-4 mb-2 rounded-2xl font-sans-medium focus:border-primary'
                        value={code}
                        placeholder="Verification Code"
                        placeholderTextColor="#64748b"
                        onChangeText={setCode}
                        keyboardType="numeric"
                    />

                    {errors.fields.code && (
                        <Text className='text-auth-error'>{errors.fields.code.message}</Text>
                    )}

                    <Pressable
                        onPress={handleVerify}
                        disabled={isLoading}
                        className={`bg-primary py-4 rounded-2xl items-center justify-center mb-2 shadow-md shadow-primary/20 active:opacity-80 ${isLoading ? 'opacity-50' : ''}`}
                    >
                        {isLoading ? <ActivityIndicator color="white" /> : <Text className='text-lg font-sans-bold mb-2'>Verify Account</Text>}
                    </Pressable>

                    <Pressable onPress={() => signUp.verifications.sendEmailCode()} className="py-2">
                        <Text className="text-blue-400 text-center font-sans-medium">Resend Code</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        )
    }

    // ទំព័រចុះឈ្មោះ (Sign Up View)
    return (
        <SafeAreaView className='auth-screen'>
            <View className='px-6 justify-center'>
                <Text className='text-foreground text-3xl font-sans-bold mb-2'>Create Account</Text>

                <View className="gap-y-1">
                    <Text className='text-auth-label'>Email Address</Text>
                    <TextInput
                        className='bg-card border border-border text-foreground px-4 py-4 mb-2 rounded-2xl font-sans-medium focus:border-primary'
                        autoCapitalize="none"
                        value={emailAddress}
                        placeholder="name@example.com"
                        placeholderTextColor="#64748b"
                        onChangeText={setEmailAddress}
                        keyboardType="email-address"
                    />
                    {errors.fields.emailAddress && (
                        <Text className='text-auth-error'>{errors.fields.emailAddress.message}</Text>
                    )}
                </View>

                <View className="gap-y-1">
                    <Text className='text-auth-label'>Password</Text>
                    <TextInput
                        className='bg-card border border-border text-foreground px-4 py-4 mb-2 rounded-2xl font-sans-medium focus:border-primary'
                        value={password}
                        placeholder="Create a password"
                        placeholderTextColor="#64748b"
                        secureTextEntry
                        onChangeText={setPassword}
                    />
                    {errors.fields.password && (
                        <Text className='text-auth-error'>{errors.fields.password.message}</Text>
                    )}
                </View>

                <Pressable
                    onPress={handleSubmit}
                    disabled={!emailAddress || !password || isLoading}
                    className={`bg-primary py-4 rounded-2xl items-center justify-center mb-2 shadow-md shadow-primary/20 active:opacity-80 ${(!emailAddress || !password || isLoading) ? 'opacity-50' : ''}`}
                >
                    {isLoading ? <ActivityIndicator color="white" /> : <Text className='text-lg font-sans-bold mb-2'>Sign Up</Text>}
                </Pressable>

                <View className='auth-link-container'>
                    <Text className="text-slate-400">Already have an account?</Text>
                    <Link href="/sign-in" asChild>
                        <Pressable>
                            <Text className='text-auth-link'>Sign In</Text>
                        </Pressable>
                    </Link>
                </View>

                <View nativeID="clerk-captcha" />
            </View>
        </SafeAreaView>
    )
}