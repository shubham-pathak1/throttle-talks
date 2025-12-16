// src/components/common/Button.tsx
import React from 'react';
import { Text, StyleSheet, ViewStyle, TextStyle, Platform, View, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS, COLORS } from '../../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
}: ButtonProps) {
  const { colorScheme, colors } = useThemeStore();
  const isDark = colorScheme === 'dark';

  const handlePress = () => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress();
  };

  const getGradientColors = (): readonly [string, string, ...string[]] | null => {
    if (disabled) return [colors.border, colors.border];
    // Strict Monochrome: No colorful gradients.
    // Primary matches the theme primary (Solid Black in light, White in dark)
    // We can still use LinearGradient for subtle sheen if desired, but for now strict solid feels more 'editorial'.
    return null;
  };

  const getBackgroundColor = () => {
    if (disabled) return colors.border;
    if (variant === 'primary') return colors.primary; // Solid Black (light) / White (dark)
    if (variant === 'accent') return colors.accent;
    if (variant === 'secondary') return colors.surfaceElevated;
    if (variant === 'glass') return 'rgba(0,0,0,0.3)';
    return 'transparent';
  };

  const getTextColor = () => {
    if (disabled) return colors.textTertiary;
    if (variant === 'primary' || variant === 'accent') return isDark ? '#000000' : '#FFFFFF'; // Invert for contrast
    if (variant === 'secondary') return colors.text;
    if (variant === 'outline') return colors.text;
    if (variant === 'ghost') return colors.text;
    if (variant === 'glass') return '#FFFFFF'; // Glass text always white usually
    return colors.text;
  };

  const getBorder = () => {
    if (variant === 'outline') {
      return {
        borderWidth: 1.5,
        borderColor: disabled ? colors.border : colors.border,
      };
    }
    if (variant === 'secondary') {
      return {
        borderWidth: 1,
        borderColor: colors.borderLight,
      }
    }
    return {};
  };

  const getPadding = () => {
    switch (size) {
      case 'sm':
        return { paddingVertical: SPACING.xs + 2, paddingHorizontal: SPACING.md };
      case 'md':
        return { paddingVertical: SPACING.md, paddingHorizontal: SPACING.xl };
      case 'lg':
        return { paddingVertical: SPACING.lg, paddingHorizontal: SPACING['2xl'] };
      default:
        return { paddingVertical: SPACING.md, paddingHorizontal: SPACING.xl };
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'sm': return FONT_SIZES.sm;
      case 'md': return FONT_SIZES.base;
      case 'lg': return FONT_SIZES.lg;
      default: return FONT_SIZES.base;
    }
  };

  const gradientColors = getGradientColors();

  return (
    <MotiView
      animate={{
        scale: 1,
        opacity: 1,
      }}
      style={[
        styles.container,
        { width: fullWidth ? '100%' : 'auto' },
        style,
      ]}
    >
      <Pressable
        onPressIn={() => {
          // Manual animation handling or just simple feedback via MotiView state if we had it.
          // For simplicity/robustness with current Moti version:
        }}
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          styles.buttonContent,
          {
            borderRadius: RADIUS.full,
            backgroundColor: getBackgroundColor(),
            ...getPadding(),
            ...getBorder(),
            transform: [{ scale: pressed ? 0.96 : 1 }],
            opacity: pressed ? 0.9 : 1, // Native verify first
          },
        ]}
      >
        {gradientColors && (
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        )}

        <View style={styles.contentRow}>
          {icon && <View style={{ marginRight: SPACING.sm }}>{icon}</View>}
          <Text
            style={[
              styles.text,
              {
                color: getTextColor(),
                fontSize: getFontSize(),
                fontFamily: FONTS.body.family,
                fontWeight: FONTS.body.weights.medium,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>

        </View>
      </Pressable>
    </MotiView>
  );
}

const styles = StyleSheet.create({
  container: {
    // Layout container
  },
  buttonContent: {
    overflow: 'hidden', // Specify exact type if needed or keep loose
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Ensure text is above gradient
  },
  text: {
    textAlign: 'center',
    letterSpacing: 1, // Increased pacing
    fontFamily: FONTS.heading.family, // Editorial
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});
