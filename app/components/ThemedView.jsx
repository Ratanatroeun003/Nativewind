import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ThemedView = ({
    children,
    className = '',
    safe = false,
    ...props
}) => {
    const insets = useSafeAreaInsets();

    return (
        <View
            className={`flex-1 bg-slate-300 dark:bg-gray-900 ${className}`}
            style={
                safe
                    ? {
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom,
                        paddingLeft: insets.left,
                        paddingRight: insets.right,
                    }
                    : {}
            }
            {...props}
        >
            {children}
        </View>
    );
};

export default ThemedView;