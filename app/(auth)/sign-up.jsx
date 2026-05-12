import { useAuth, useSignUp } from '@clerk/expo'
import { Link, useRouter } from 'expo-router'
import { styled } from 'nativewind'
import React from 'react'
import { ActivityIndicator, Alert, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
    const SafeAreaView = styled(RNSafeAreaView)
    const { signUp, isLoaded, fetchStatus } = useSignUp()
    const { isSignedIn } = useAuth()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [code, setCode] = React.useState('')

    const isLoading = fetchStatus === 'fetching';

    // ១. មុខងារចុះឈ្មោះ និងផ្ញើ OTP (Fix មិនផ្ញើ OTP)
    const handleSubmit = async () => {
        if (!isLoaded) return;

        try {
            // ត្រូវប្រើ create មុនគេបង្អស់
            await signUp.create({
                emailAddress,
                password,
            });

            // បន្ទាប់មកទើបផ្ញើ OTP តាមរយៈ prepareEmailAddressVerification
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

            console.log("OTP code sent successfully!");
        } catch (err) {
            console.error("Sign Up Error:", JSON.stringify(err, null, 2));
            Alert.alert("Error", err.errors?.[0]?.message || "Something went wrong");
        }
    }

    // ២. មុខងារផ្ទៀងផ្ទាត់ និង Redirect (Fix មិនប្តូរទំព័រ)
    const handleVerify = async () => {
        if (!isLoaded) return;

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });

            if (completeSignUp.status === 'complete') {
                // ប្រាប់ Clerk ថាការចុះឈ្មោះត្រូវបានបញ្ចប់ ដើម្បីបង្កើត Session
                await signUp.finalize({
                    navigate: () => {
                        // ការប្រើ replace នឹងបិទទំព័រ verify ចោល ហើយទៅ dashboard តែម្តង
                        router.replace('/(dashboard)');
                    }
                });
            } else {
                console.log("Status is not complete:", completeSignUp.status);
            }
        } catch (err) {
            console.error("Verification Error:", JSON.stringify(err, null, 2));
            Alert.alert("Verification Failed", err.errors?.[0]?.message || "Invalid Code");
        }
    }

    // មុខងារផ្ញើកូដឡើងវិញ
    const onResendCode = async () => {
        try {
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
            Alert.alert("Success", "New code sent to your email!");
        } catch (err) {
            Alert.alert("Error", err.errors?.[0]?.message);
        }
    };

    if (isSignedIn) return null;

    // --- ទិដ្ឋភាពពេលផ្ទៀងផ្ទាត់ (Verification View) ---
    if (signUp?.status === 'missing_requirements' &&
        signUp?.unverifiedFields.includes('email_address')) {
        return (
            <SafeAreaView className="flex-1 bg-background">
                <View className="flex-1 px-8 justify-center">
                    <Text className="text-foreground text-3xl font-sans-bold mb-2">Verify Email</Text>
                    <Text className="text-muted-foreground font-sans mb-6">We've sent a 6-digit code to your email.</Text>

                    <Text className="text-muted-foreground text-sm font-sans-medium mb-2 ml-1">Verification Code</Text>
                    <TextInput
                        className="w-full h-14 bg-card border border-border text-foreground px-4 rounded-2xl font-sans-medium focus:border-primary"
                        value={code}
                        placeholder="123456"
                        placeholderTextColor="#94a3b8"
                        onChangeText={setCode}
                        keyboardType="numeric"
                    />

                    <Pressable
                        onPress={handleVerify}
                        disabled={isLoading || code.length < 6}
                        className={`will-change-pressable w-full h-14 bg-primary rounded-2xl justify-center items-center mt-8 shadow-md shadow-primary/20 ${(isLoading || code.length < 6) ? 'opacity-50' : 'active:opacity-80'}`}
                    >
                        {isLoading ? <ActivityIndicator color="white" /> : <Text className="text-white font-sans-bold text-lg">Verify Account</Text>}
                    </Pressable>

                    <Pressable onPress={onResendCode} className="mt-8 items-center">
                        <Text className="text-primary font-sans-bold">Resend Code</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        )
    }

    // --- ទំព័រចុះឈ្មោះ (Sign Up View) ---
    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="flex-1 px-8 justify-center">
                <View className="w-full">
                    <Text className="text-foreground text-4xl font-sans-bold mb-2">Create Account</Text>
                    <Text className="text-muted-foreground font-sans mb-4">Join us to manage your subscriptions easily.</Text>

                    <View className="mt-6">
                        <Text className="text-muted-foreground text-sm font-sans-medium mb-2 ml-1">Email Address</Text>
                        <TextInput
                            className="w-full h-14 bg-card border border-border text-foreground px-4 rounded-2xl font-sans-medium focus:border-primary"
                            autoCapitalize="none"
                            value={emailAddress}
                            placeholder="name@example.com"
                            placeholderTextColor="#94a3b8"
                            onChangeText={setEmailAddress}
                            keyboardType="email-address"
                        />
                    </View>

                    <View className="mt-4">
                        <Text className="text-muted-foreground text-sm font-sans-medium mb-2 ml-1">Password</Text>
                        <TextInput
                            className="w-full h-14 bg-card border border-border text-foreground px-4 rounded-2xl font-sans-medium focus:border-primary"
                            value={password}
                            placeholder="Create a password"
                            placeholderTextColor="#94a3b8"
                            secureTextEntry
                            onChangeText={setPassword}
                        />
                    </View>

                    <Pressable
                        onPress={handleSubmit}
                        disabled={!emailAddress || password.length < 8 || isLoading}
                        className={`will-change-pressable w-full h-14 bg-primary rounded-2xl justify-center items-center mt-10 shadow-md shadow-primary/20 ${(!emailAddress || password.length < 8 || isLoading) ? 'opacity-50' : 'active:opacity-80'}`}
                    >
                        {isLoading ? <ActivityIndicator color="white" /> : <Text className="text-white font-sans-bold text-lg">Sign Up</Text>}
                    </Pressable>

                    <View className="flex-row justify-center mt-8 items-center">
                        <Text className="text-muted-foreground font-sans">Already have an account? </Text>
                        <Link href="/sign-in" asChild>
                            <Pressable>
                                <Text className="text-primary font-sans-bold">Sign In</Text>
                            </Pressable>
                        </Link>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}