import { View } from 'react-native'
import ThemedButton from './ThemedButton'
import ThemedText from './ThemedText'

const ListHeading = ({ title }) => {
    return (
        <View className='list-heading'>
            <ThemedText variant='title'>{title}</ThemedText>
            <ThemedButton variant='primary'>
                <ThemedText variant='button'>View all</ThemedText>
            </ThemedButton>
        </View>
    )
}

export default ListHeading