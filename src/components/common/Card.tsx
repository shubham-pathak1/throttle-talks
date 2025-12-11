// src/components/common/Card.tsx
import { View, StyleSheet, ViewStyle, TouchableOpacity, Platform } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useThemeStore } from '../../store/themeStore';
import { SPACING, RADIUS } from '../../constants/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  elevated?: boolean;
  padding?: keyof typeof SPACING;
}

export default function Card({
  children,
  onPress,
  style,
  elevated = true,
  padding = 'lg',
}: CardProps) {
  const { colors } = useThemeStore();

  const handlePress = () => {
    if (onPress) {
      if (Platform.OS === 'ios') {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      onPress();
    }
  };

  const content = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          padding: SPACING[padding],
        },
        elevated && styles.elevated,
        style,
      ]}
    >
      {children}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.7}
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
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
});