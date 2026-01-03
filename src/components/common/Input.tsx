// src/components/common/Input.tsx
import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle, StyleProp } from 'react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
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

  const labelPositionStart = icon ? 48 : 20; // Align with text start
  const labelPositionFloating = 12; // Align near left edge when floating

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.contentContainer}>
        <View
          style={[
            styles.inputContainer,
            variant === 'underline' && styles.underline,
            {
              backgroundColor: variant === 'glass' ? 'rgba(255,255,255,0.05)' : 'transparent',
              borderColor: error
                ? colors.error
                : isFocused
                  ? colors.text
                  : (variant === 'underline' ? 'transparent' : colors.border),
              borderBottomColor: variant === 'underline'
                ? (isFocused ? colors.text : colors.border)
                : undefined,
              borderWidth: variant === 'underline' ? 0 : (isFocused ? 1.5 : 1),
              borderBottomWidth: variant === 'underline' ? (isFocused ? 2 : 1) : undefined,
            },
          ]}
        >
          {label && (hasValue || isFocused) && (
            <Text
              style={[
                styles.label,
                {
                  color: error ? colors.error : colors.textTertiary,
                  fontFamily: FONTS.body.family,
                  position: 'absolute',
                  top: 18,
                  left: labelPositionStart,
                  zIndex: 10,
                  opacity: 0, // Hide entirely when focused/hasValue to mimic native placeholder behavior for now
                },
              ]}
            >
              {label}
            </Text>
          )}
          {label && (!hasValue && !isFocused) && (
            <Text
              style={[
                styles.label,
                {
                  color: error ? colors.error : colors.textTertiary,
                  fontFamily: FONTS.body.family,
                  position: 'absolute',
                  top: 18,
                  left: labelPositionStart,
                  zIndex: 10,
                },
              ]}
            >
              {label}
            </Text>
          )}

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
            placeholderTextColor="transparent"
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
    minHeight: 56, // Allow expansion for multiline inputs
    position: 'relative', // Ensure absolute label is relative to this
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
