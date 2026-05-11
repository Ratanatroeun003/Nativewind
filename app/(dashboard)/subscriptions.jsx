import { useState } from 'react'
import { FlatList, Pressable, Text, TextInput, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSubscriptions } from '../../lib/subscriptionContext'
import CreateSubscriptionModal from '../components/CreateSubscriptionModal'
import SubscriptionCart from '../components/SubscriptionCart'

const Subscriptions = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [expandedId, setExpandedId] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)
    const { subscriptions, addSubscription } = useSubscriptions()

    const filteredSubscriptions = subscriptions.filter((sub) =>
        sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.category || '').toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handlePress = (id) => {
        setExpandedId(expandedId === id ? null : id)
    }

    const handleCreateSubscription = (subscription) => {
        addSubscription(subscription)
        setModalVisible(false)
    }

    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className='px-6 pt-4 pb-2'>
                <View className='flex-row justify-between items-center mb-6'>
                    <View>
                        <Text className="text-foreground text-3xl font-sans-extrabold">Subscriptions</Text>
                        <Text className="text-muted-foreground text-xs font-sans-medium mt-1 uppercase tracking-wider">{filteredSubscriptions.length} subscriptions</Text>
                    </View>
                    <Pressable
                        onPress={() => setModalVisible(true)}
                        className='rounded-2xl bg-primary px-5 py-3 shadow-lg'
                    >
                        <Text className='text-white font-sans-bold text-sm tracking-wide'>+ Add</Text>
                    </Pressable>
                </View>
                <TextInput
                    className="bg-card border-2 border-border/40 rounded-2xl p-4 mb-6 text-foreground font-sans-medium"
                    placeholder="Search subscriptions..."
                    placeholderTextColor="#999"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>
            <FlatList
                data={filteredSubscriptions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View className='px-6 mb-2'>
                        <SubscriptionCart
                            {...item}
                            onPress={() => handlePress(item.id)}
                            expanded={expandedId === item.id}
                        />
                    </View>
                )}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={
                    <Text className='text-muted-foreground text-sm italic px-6 font-sans'>No subscriptions found</Text>
                }
            />
            <CreateSubscriptionModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onCreate={handleCreateSubscription}
            />
        </SafeAreaView>
    )
}

export default Subscriptions