// src/components/common/Input.tsx
import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { MotiView, MotiText } from 'moti';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  variant?: 'outline' | 'underline' | 'glass';
}

export default function Input({
  label,
  error,
  icon,
  containerStyle,
  value,
  variant = 'outline',
  ...textInputProps
}: InputProps) {
  const { colors } = useThemeStore();
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.contentContainer}>
        {label && (
          <MotiText
            from={{
              translateY: hasValue || isFocused ? -24 : 0,
              scale: hasValue || isFocused ? 0.85 : 1,
              translateX: hasValue || isFocused ? -10 : 0,
            }}
            animate={{
              translateY: hasValue || isFocused ? -28 : 14,
              scale: hasValue || isFocused ? 0.85 : 1,
              translateX: hasValue || isFocused ? 0 : (icon ? 30 : 10), // Adjust for icon padding
            }}
            transition={{
              type: 'timing',
              duration: 200,
            }}
            style={[
              styles.label,
              {
                color: error ? colors.error : (isFocused ? colors.accent : colors.textTertiary),
                fontFamily: FONTS.body.family,
                backgroundColor: colors.background, // Cover border
                paddingHorizontal: 4,
                zIndex: 10,
                position: 'absolute',
                left: SPACING.xs,
              },
            ]}
          >
            {label}
          </MotiText>
        )}

        <View
          style={[
            styles.inputContainer,
            variant === 'underline' && styles.underline,
            {
              backgroundColor: variant === 'glass' ? 'rgba(255,255,255,0.05)' : 'transparent',
              borderColor: error
                ? colors.error
                : isFocused
                  ? colors.text // Focus is strictly text color (black/white)
                  : (variant === 'underline' ? 'transparent' : colors.border),
              borderBottomColor: variant === 'underline'
                ? (isFocused ? colors.text : colors.border)
                : undefined,
              borderWidth: variant === 'underline' ? 0 : (isFocused ? 1.5 : 1),
              borderBottomWidth: variant === 'underline' ? (isFocused ? 2 : 1) : undefined,
            },
          ]}
        >
          {icon && <View style={styles.icon}>{icon}</View>}
          <TextInput
            value={value}
            {...textInputProps}
            onFocus={(e) => {
              setIsFocused(true);
              textInputProps.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              textInputProps.onBlur?.(e);
            }}
            style={[
              styles.input,
              {
                color: colors.text,
                fontFamily: FONTS.body.family,
                paddingLeft: icon ? SPACING.xs : SPACING.md,
              },
              textInputProps.style,
            ]}
            placeholderTextColor="transparent" // Hide default placeholder, use floating label
          />
        </View>
      </View>

      {error && (
        <Text
          style={[
            styles.error,
            {
              color: colors.error,
              fontFamily: FONTS.body.family,
            },
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: SPACING.md,
  },
  contentContainer: {
    position: 'relative',
    justifyContent: 'center',
  },
  label: {
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.md,
    height: 56, // Fixed height for consistency
  },
  icon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
  },
  error: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
    marginLeft: SPACING.xs,
    fontWeight: '500',
  },
  underline: {
    borderRadius: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
});
