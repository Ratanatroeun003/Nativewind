import { View } from 'react-native'

const Spacer = ({ size = 4, horizontal = false }) => {
    return (
        <View
            style={{
                width: horizontal ? size * 4 : '100%',
                height: horizontal ? '100%' : size * 4
            }}
        />
    )
}

export default Spacer