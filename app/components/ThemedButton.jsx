import { Pressable } from 'react-native';

const ThemedButton = ({
  children,
  className = '',
  variant = 'primary',
  disabled = false,
  ...props
}) => {
  const variants = {
    primary: 'bg-blue-500',
    secondary: 'bg-gray-500',
    danger: 'bg-red-500',
  };

  return (
    <Pressable
      disabled={disabled}
      className={`
        rounded-lg px-4 py-2
        ${variants[variant]}
        ${disabled ? 'opacity-50' : 'active:opacity-70'}
        ${className}
      `}
      {...props}
    >
      {children}
    </Pressable>
  );
};

export default ThemedButton;