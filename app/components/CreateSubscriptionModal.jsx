import { usePostHog } from 'posthog-react-native';
import { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { icons } from '../../assets/constants/icons';

const defaultData = {
    name: '',
    price: '',
    category: 'Design',
    plan: '',
    billing: 'monthly',
    paymentMethod: '',
};

const CATEGORIES = [
    { name: 'Design', color: '#FF6B6B' },
    { name: 'AI', color: '#9B59B6' },
    { name: 'Developer', color: '#4ECDC4' },
    { name: 'Entertainment', color: '#E50914' },
];

const BILLING_OPTIONS = ['monthly', 'yearly'];

const CreateSubscriptionModal = ({ visible, onClose, onCreate }) => {
    const [form, setForm] = useState(defaultData);
    const posthog = usePostHog();

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const getCategoryColor = (categoryName) => {
        const category = CATEGORIES.find((cat) => cat.name === categoryName);
        return category ? category.color : '#f07b62';
    };

    const handleSubmit = () => {
        if (!form.name.trim() || !form.price.trim()) {
            return;
        }

        const newSubscription = {
            id: `${form.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
            name: form.name.trim(),
            price: parseFloat(form.price) || 0,
            currency: 'USD',
            icon: icons.add,
            plan: form.plan.trim() || 'Standard',
            category: form.category,
            paymentMethod: form.paymentMethod.trim() || 'N/A',
            startDate: new Date().toISOString(),
            renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            billing: form.billing,
            status: 'active',
            color: getCategoryColor(form.category),
        };

        if (posthog) {
            posthog.capture('create_subscription', {
                name: newSubscription.name,
                price: newSubscription.price,
                currency: newSubscription.currency,
                plan: newSubscription.plan,
                category: newSubscription.category,
                billing: newSubscription.billing,
                paymentMethod: newSubscription.paymentMethod,
                status: newSubscription.status,
            });
        }

        onCreate(newSubscription);
        setForm(defaultData);
        onClose();
    };
    const handleClose = () => {
        setForm(defaultData);
        onClose();
    };
    return (
        <Modal visible={visible} animationType='slide'>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className='flex-1 bg-background'
            >
                {/* Header */}
                <View className='flex-row justify-between items-center px-6 py-6 bg-primary'>
                    <Text className='text-white text-2xl font-sans-bold'>New Subscription</Text>
                    <Pressable onPress={handleClose} className='px-3 py-2'>
                        <Text className='text-white text-base font-sans-bold'>✕</Text>
                    </Pressable>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} className='flex-1 px-6 pt-8' keyboardShouldPersistTaps="handled">
                    {/* Name Input */}
                    <View className='mb-6'>
                        <Text className='text-foreground text-sm font-sans-bold uppercase tracking-wider mb-2'>Subscription Name</Text>
                        <TextInput
                            value={form.name}
                            onChangeText={(value) => handleChange('name', value)}
                            placeholder='e.g., Netflix, Spotify, Adobe...'
                            placeholderTextColor='#999'
                            className='bg-card border-2 border-border/40 rounded-2xl p-4 text-foreground text-lg font-sans-medium'
                        />
                    </View>

                    {/* Price Input */}
                    <View className='mb-6'>
                        <Text className='text-foreground text-sm font-sans-bold uppercase tracking-wider mb-2'>Price</Text>
                        <View className='flex-row items-center'>
                            <Text className='text-foreground text-xl font-sans-bold mr-2'>$</Text>
                            <TextInput
                                value={form.price}
                                onChangeText={(value) => handleChange('price', value)}
                                placeholder='9.99'
                                keyboardType='decimal-pad'
                                placeholderTextColor='#999'
                                className='flex-1 bg-card border-2 border-border/40 rounded-2xl p-4 text-foreground text-lg font-sans-medium'
                            />
                        </View>
                    </View>

                    {/* Category Selection */}
                    <View className='mb-6'>
                        <Text className='text-foreground text-sm font-sans-bold uppercase tracking-wider mb-3'>Category</Text>
                        <View className='flex-row flex-wrap gap-2'>
                            {CATEGORIES.map((cat) => (
                                <Pressable
                                    key={cat.name}
                                    onPress={() => handleChange('category', cat.name)}
                                    className={`rounded-2xl px-5 py-3 border-2 ${form.category === cat.name
                                            ? 'border-2'
                                            : 'bg-card border-border/40'
                                        }`}
                                    style={
                                        form.category === cat.name
                                            ? { backgroundColor: cat.color, borderColor: cat.color }
                                            : {}
                                    }
                                >
                                    <Text
                                        className={`font-sans-bold text-sm ${form.category === cat.name ? 'text-white' : 'text-foreground'
                                            }`}
                                    >
                                        {cat.name}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    {/* Plan Input */}
                    <View className='mb-6'>
                        <Text className='text-foreground text-sm font-sans-bold uppercase tracking-wider mb-2'>Plan</Text>
                        <TextInput
                            value={form.plan}
                            onChangeText={(value) => handleChange('plan', value)}
                            placeholder='e.g., Premium, Pro, Team...'
                            placeholderTextColor='#999'
                            className='bg-card border-2 border-border/40 rounded-2xl p-4 text-foreground text-lg font-sans-medium'
                        />
                    </View>

                    {/* Billing Selection */}
                    <View className='mb-8'>
                        <Text className='text-foreground text-sm font-sans-bold uppercase tracking-wider mb-3'>Billing Cycle</Text>
                        <View className='flex-row gap-3'>
                            {BILLING_OPTIONS.map((bill) => (
                                <Pressable
                                    key={bill}
                                    onPress={() => handleChange('billing', bill)}
                                    className={`flex-1 rounded-2xl px-5 py-3 border-2 ${form.billing === bill
                                            ? 'bg-primary border-primary'
                                            : 'bg-card border-border/40'
                                        }`}
                                >
                                    <Text
                                        className={`font-sans-bold text-sm text-center ${form.billing === bill ? 'text-white' : 'text-foreground'
                                            }`}
                                    >
                                        {bill.charAt(0).toUpperCase() + bill.slice(1)}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    {/* Payment Method Input */}
                    <View className='mb-8'>
                        <Text className='text-foreground text-sm font-sans-bold uppercase tracking-wider mb-2'>Payment Method (Optional)</Text>
                        <TextInput
                            value={form.paymentMethod}
                            onChangeText={(value) => handleChange('paymentMethod', value)}
                            placeholder='e.g., Visa ending in 1234'
                            placeholderTextColor='#999'
                            className='bg-card border-2 border-border/40 rounded-2xl p-4 text-foreground text-lg font-sans-medium'
                        />
                    </View>

                    {/* Submit Button */}
                    <Pressable
                        onPress={handleSubmit}
                        className='rounded-2xl bg-primary px-6 py-4 items-center mb-8 shadow-lg'
                    >
                        <Text className='text-white text-lg font-sans-bold tracking-wide'>Add Subscription</Text>
                    </Pressable>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default CreateSubscriptionModal;
