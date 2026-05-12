import { useAuth, useSignUp } from '@clerk/expo'
import { Link, useRouter } from 'expo-router'
import { styled } from 'nativewind'
import React from 'react'
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
    const SafeAreaView = styled(RNSafeAreaView)
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
            <SafeAreaView className='bg-background flex-1'>
                <View className='px-6 py-6 justify-center'>
                    <Text className='text-foreground text-3xl font-sans-bold mb-2'>Verify Email</Text>
                    <Text className='text-muted-foreground mb-4'>We've sent a code to your email.</Text>

                    <TextInput
                        className='bg-card border border-border text-foreground px-4 py-4 mb-2 rounded-2xl font-sans-medium focus:border-primary'
                        value={code}
                        placeholder="Verification Code"
                        placeholderTextColor="#64748b"
                        onChangeText={setCode}
                        keyboardType="numeric"
                    />

                    {errors.fields.code && (
                        <Text className='text-error text-sm mb-4'>{errors.fields.code.message}</Text>
                    )}

                    <Pressable
                        onPress={handleVerify}
                        disabled={isLoading}
                        className={`bg-primary py-4 rounded-2xl items-center justify-center mb-2 shadow-md shadow-primary/20 ${isLoading ? 'opacity-50' : 'active:opacity-80'}`}
                    >
                        {isLoading ? <ActivityIndicator color="white" /> : <Text className='text-white text-lg font-sans-bold'>Verify Account</Text>}
                    </Pressable>
                    <Pressable onPress={() => signUp.verifications.sendEmailCode()} className="py-2">
                        <Text className="text-blue-400 text-center font-sans-medium">Resend Code</Text>
                    </Pressable>

                    <Pressable onPress={() => signUp.reset()} className="py-2 mt-2">
                        <Text className="text-slate-400 text-center font-sans-medium">Change email</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        )
    }

    // ទំព័រចុះឈ្មោះ (Sign Up View)
    return (
        <SafeAreaView className='bg-background flex-1'>
            <View className='px-6 py-6 justify-center'>
                <Text className='text-foreground text-3xl font-sans-bold mb-6'>Create Account</Text>

                <View className="gap-y-2 mb-4">
                    <Text className='text-foreground text-sm font-sans-medium'>Email Address</Text>
                    <TextInput
                        className='bg-card border border-border text-foreground px-4 py-4 rounded-2xl font-sans-medium focus:border-primary'
                        autoCapitalize="none"
                        value={emailAddress}
                        placeholder="name@example.com"
                        placeholderTextColor="#64748b"
                        onChangeText={setEmailAddress}
                        keyboardType="email-address"
                    />
                    {errors.fields.emailAddress && (
                        <Text className='text-error text-sm'>{errors.fields.emailAddress.message}</Text>
                    )}
                </View>

                <View className="gap-y-2 mb-6">
                    <Text className='text-foreground text-sm font-sans-medium'>Password</Text>
                    <TextInput
                        className='bg-card border border-border text-foreground px-4 py-4 rounded-2xl font-sans-medium focus:border-primary'
                        value={password}
                        placeholder="Create a password"
                        placeholderTextColor="#64748b"
                        secureTextEntry
                        onChangeText={setPassword}
                    />
                    {errors.fields.password && (
                        <Text className='text-error text-sm'>{errors.fields.password.message}</Text>
                    )}
                </View>

                <Pressable
                    onPress={handleSubmit}
                    disabled={!emailAddress || !password || isLoading}
                    className={`bg-primary py-4 rounded-2xl items-center justify-center mb-4 shadow-md shadow-primary/20 ${(!emailAddress || !password || isLoading) ? 'opacity-50' : 'active:opacity-80'}`}
                >
                    {isLoading ? <ActivityIndicator color="white" /> : <Text className='text-white text-lg font-sans-bold'>Sign Up</Text>}
                </Pressable>

                <View className='flex-row justify-center items-center gap-2'>
                    <Text className="text-muted-foreground">Already have an account?</Text>
                    <Link href="/sign-in" asChild>
                        <Pressable>
                            <Text className='text-blue-500 font-sans-bold'>Sign In</Text>
                        </Pressable>
                    </Link>
                </View>

                <View nativeID="clerk-captcha" />
            </View>
        </SafeAreaView>
    )
}