import { BlurView } from 'expo-blur';
import { View, StyleSheet, ViewStyle, TouchableOpacity, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useThemeStore } from '../../store/themeStore';
import { SPACING, RADIUS } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevated?: boolean;
  glass?: boolean;
  padding?: keyof typeof SPACING | 'none';
  noBorder?: boolean;
}

export default function Card({
  children,
  onPress,
  style,
  elevated = true,
  glass = false,
  padding = 'lg',
  noBorder = false,
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

  const paddingValue = padding === 'none' ? 0 : SPACING[padding as keyof typeof SPACING];

  // Glass card with BlurView
  if (glass) {
    const glassContent = (
      <BlurView
        intensity={isDark ? 60 : 80}
        tint={isDark ? 'dark' : 'light'}
        style={[
          styles.card,
          {
            backgroundColor: isDark ? 'rgba(20, 20, 20, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
            borderWidth: noBorder ? 0 : 1,
            padding: paddingValue,
          },
          style,
        ]}
      >
        {children}
      </BlurView>
    );

    if (onPress) {
      return (
        <TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
          {glassContent}
        </TouchableOpacity>
      );
    }
    return glassContent;
  }

  // Standard solid card
  const content = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: elevated ? colors.surfaceElevated : colors.surface,
          borderColor: noBorder ? 'transparent' : colors.border,
          borderWidth: noBorder ? 0 : 1,
          padding: paddingValue,
        },
        elevated && !isDark && styles.shadow,
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.85}>
        {content}
      </TouchableOpacity>
    );
  }
  return content;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.xl,
    overflow: 'hidden',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
});
