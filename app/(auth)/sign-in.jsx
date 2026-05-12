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

    // --- ទិដ្ឋភាពពេលផ្ទៀងផ្ទាត់ MFA (Verify View) ---
    if (signIn.status === 'needs_client_trust') {
        return (
            <SafeAreaView className="flex-1 bg-background px-8 justify-center">
                <Text className="text-foreground text-3xl font-sans-bold mb-2">Verify your account</Text>
                <Text className="text-muted-foreground font-sans mb-6">Enter the code sent to your email.</Text>

                <Text className="text-muted-foreground text-sm font-sans-medium mb-2 ml-1">Verification Code</Text>
                <TextInput
                    className="w-full h-14 bg-card border border-border text-foreground px-4 rounded-2xl font-sans-medium focus:border-primary"
                    value={code}
                    placeholder="123456"
                    placeholderTextColor="#94a3b8"
                    onChangeText={setCode}
                    keyboardType="numeric"
                />
                {errors?.fields?.code && <Text className="text-error text-xs font-sans mt-2 ml-1">{errors.fields.code.message}</Text>}

                <Pressable
                    onPress={handleVerify}
                    disabled={isFetching}
                    className={`w-full h-14 bg-primary rounded-2xl justify-center items-center mt-8 shadow-md shadow-primary/20 ${isFetching ? 'opacity-50' : 'active:opacity-80'}`}
                >
                    {isFetching ? <ActivityIndicator color="white" /> : <Text className="text-white font-sans-bold text-lg">Verify</Text>}
                </Pressable>

                <Pressable className="mt-8 items-center" onPress={() => signIn.mfa.sendEmailCode()}>
                    <Text className="text-primary font-sans-bold">Resend code</Text>
                </Pressable>

                <Pressable className="mt-6 items-center" onPress={() => signIn.reset()}>
                    <Text className="text-muted-foreground font-sans">Start over</Text>
                </Pressable>
            </SafeAreaView>
        )
    }

    // --- ទិដ្ឋភាពពេល Sign In (Login View) ---
    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="w-full px-8 justify-center">
                <Text className="text-foreground text-4xl font-sans-bold mb-2">Sign In</Text>
                <Text className="text-muted-foreground font-sans mb-4">Welcome back to your subscriptions.</Text>

                <Text className="text-muted-foreground text-sm font-sans-medium mt-6 mb-2 ml-1">Email address</Text>
                <TextInput
                    className="w-full h-14 bg-card border border-border text-foreground px-4 rounded-2xl font-sans-medium focus:border-primary"
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="name@example.com"
                    placeholderTextColor="#94a3b8"
                    onChangeText={setEmailAddress}
                    keyboardType="email-address"
                />
                {errors?.fields?.identifier && <Text className="text-error text-xs font-sans mt-2 ml-1">{errors.fields.identifier.message}</Text>}

                <Text className="text-muted-foreground text-sm font-sans-medium mt-4 mb-2 ml-1">Password</Text>
                <TextInput
                    className="w-full h-14 bg-card border border-border text-foreground px-4 rounded-2xl font-sans-medium focus:border-primary"
                    value={password}
                    placeholder="Enter password"
                    placeholderTextColor="#94a3b8"
                    secureTextEntry
                    onChangeText={setPassword}
                />
                {errors?.fields?.password && <Text className="text-error text-xs font-sans mt-2 ml-1">{errors.fields.password.message}</Text>}

                <Pressable
                    onPress={handleSubmit}
                    disabled={isSignInDisabled}
                    className={`w-full h-14 bg-primary rounded-2xl justify-center items-center mt-10 shadow-md shadow-primary/20 ${isSignInDisabled ? 'opacity-50' : 'active:opacity-80'}`}
                >
                    {isFetching ? <ActivityIndicator color="white" /> : <Text className="text-white font-sans-bold text-lg">Continue</Text>}
                </Pressable>

                <View className="flex-row justify-center mt-8 items-center">
                    <Text className="text-muted-foreground font-sans">Don't have an account? </Text>
                    <Link href="/sign-up">
                        <Text className="text-primary font-sans-bold">Sign up</Text>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    )
}