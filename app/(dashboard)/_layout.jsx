import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { tabs } from '../../assets/constants/data';
const TabLayout = () => {
    const { icons } = require('../../assets/constants/icons');
    const TapIcon = ({ focused, icon }) => {

        return <View className='items-center justify-center pt-9'>
            <View
                className={`justify-center w-10 h-10 items-center transition-all duration-400 rounded-full ${focused ? 'bg-blue-500' : 'bg-gray-300'}`}
            >
                <icon.library name={icon.name} size={20} color={focused ? '#fff' : '#4B5563'} />
            </View>
            {focused && (<View className=' mt-1 w-3 h-1 bg-blue-500 rounded-full' />)}
        </View>
    }
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 20,
                    marginHorizontal: 20,
                    height: 70,
                    borderRadius: 25,
                    borderTopWidth: 0,
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 10 },
                }
            }}
        >
            {tabs.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{
                        title: tab.title,
                        tabBarIcon: ({ focused }) => <TapIcon focused={focused} icon={tab.icon} />
                    }}

                />
            ))}
        </Tabs >
    )
}
export default TabLayout;