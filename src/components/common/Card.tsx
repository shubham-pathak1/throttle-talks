import { BlurView } from 'expo-blur';
import { View, StyleSheet, ViewStyle, TouchableOpacity, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useThemeStore } from '../../store/themeStore';
import { SPACING, RADIUS, COLORS } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevated?: boolean;
  glass?: boolean;
  padding?: keyof typeof SPACING | 'none';
}

export default function Card({
  children,
  onPress,
  style,
  elevated = true,
  glass = false,
  padding = 'lg',
  ...props
}: CardProps) {
  const { colorScheme, colors } = useThemeStore();
  const isDark = colorScheme === 'dark';

  const handlePress = () => {
    if (onPress) {
      if (Platform.OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onPress();
    }
  };

  const Container = glass ? BlurView : View;

  // For blur we need specific logic
  const blurProps = glass ? {
    intensity: isDark ? 40 : 60,
    tint: isDark ? 'dark' : 'light',
  } : {};

  const content = (
    <Container
      {...blurProps as any}
      style={[
        styles.card,
        {
          backgroundColor: glass
            ? 'transparent'
            : (elevated ? colors.surfaceElevated : colors.surface),
          padding: padding === 'none' ? 0 : SPACING[padding as keyof typeof SPACING],
          borderColor: glass ? 'rgba(255,255,255,0.1)' : 'transparent',
          borderWidth: glass ? 1 : 0,
        },
        // Only apply shadows if NOT glass, or very subtle for glass
        elevated && !glass && {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: isDark ? 0.3 : 0.05,
          shadowRadius: 8,
          elevation: 4,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Container>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        style={style}
      >
        {content}
      </TouchableOpacity>
    );
  }
  return content;
}
const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.xl, // More rounded modern look
    overflow: 'visible', // Changed to visible for shadows to work on Android if needed, but usually hidden is safer for content clipping.
  },
});
