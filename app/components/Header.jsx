import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, Text, View } from 'react-native';
import logo from '../../assets/images/OIP.webp';
import ThemedView from './ThemedView';
const Header = () => {
    return (
        <ThemedView safe='true'>
            <View className="flex-row items-center justify-between mt-4 px-4">
                <View className="items-center">
                    <Image
                        source={logo}
                        className="w-17 h-17 rounded-full border border-gray-300 dark:border-gray-600"
                    />
                </View>
                <View className="flex-row items-center gap-4">
                    <Pressable className="p-4 rounded-full active:bg-gray-200 dark:active:bg-gray-700 border border-gray-300 dark:border-gray-600">
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color="#4B5563"
                        />
                    </Pressable>
                    <Pressable className="w-16 h-16 rounded-full items-center justify-center border border-gray-300 dark:border-gray-600 bg-slate-300 dark:bg-gray-800">
                        <Text className='text-2xl font-bold text-gray-700 dark:text-slate-300'>R</Text>
                    </Pressable>
                </View>
            </View>
        </ThemedView>
    );
};

export default Header;