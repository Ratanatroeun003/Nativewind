import { Pressable, Text, View } from 'react-native'

const ListHeading = ({ title, onPress }) => {
    return (
        <View className='flex-row justify-between items-center mb-4 px-6'>
            {/* ចំណងជើងផ្នែក (Section Title) */}
            <Text className='text-xl font-sans-bold text-foreground'>
                {title}
            </Text>

            {/* ប៊ូតុង View All */}
            <Pressable
                onPress={onPress}
                className='border border-border rounded-xl px-4 py-2 bg-card active:opacity-60'
            >
                <Text className='text-primary text-sm font-sans-bold'>
                    View all
                </Text>
            </Pressable>
        </View>
    )
}

export default ListHeading