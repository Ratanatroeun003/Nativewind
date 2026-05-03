import { Stack } from "expo-router";
export default function ComponentLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
            }}
        />
    );
}