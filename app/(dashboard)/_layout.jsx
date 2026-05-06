import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { tabs } from '../../assets/constants/data';

const TapIcon = ({ focused, icon }) => {
    return (
        <View className="tab-icon-wrapper">
            <View
                className={`tab-icon-pill ${focused ? 'tab-pill-active' : 'tab-pill-inactive'}`}
            >
                <icon.library
                    name={icon.name}
                    size={24}
                    color={focused ? '#fff' : '#000'}
                />
            </View>

            {focused && <View className="tab-indicator" />}
        </View>
    );
};

const TabLayout = () => {
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
                    backgroundColor: '#fff',
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