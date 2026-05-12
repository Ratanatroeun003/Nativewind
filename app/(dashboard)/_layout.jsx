import { useAuth } from '@clerk/expo';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { tabs } from '../../assets/constants/data';

const TapIcon = ({ focused, icon }) => {
    return (
        <View className="items-center justify-center gap-1 mt-8">
            <View
                className={`w-12 h-12 rounded-full items-center justify-center ${focused ? 'bg-primary items-center justify-center' : 'bg-transparent'}`}
            >
                {React.createElement(icon.library, {
                    name: icon.name,
                    size: 24,
                    color: focused ? '#fff' : '#000',
                })}
            </View>

            {focused && <View className="w-1.5 h-1.5 rounded-full bg-primary" />}
        </View>
    );
};

const TabLayout = () => {
    const { isSignedIn, isLoaded } = useAuth()

    if (!isLoaded) {
        return null
    }

    if (!isSignedIn) {
        return <Redirect href="/(auth)/sign-in" />
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 24,
                    marginHorizontal: 20,
                    height: 70,
                    borderRadius: 35,
                    borderTopWidth: 0,
                    backgroundColor: '#8fd1bd',
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                    shadowOpacity: 0.1,
                    shadowRadius: 20,
                }
            }}
        >
            {tabs.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        title: tab.title,
                        tabBarIcon: ({ focused }) => (
                            <TapIcon focused={focused} icon={tab.icon} />
                        )
                    }}
                />
            ))}
        </Tabs>
    );
};

export default TabLayout;