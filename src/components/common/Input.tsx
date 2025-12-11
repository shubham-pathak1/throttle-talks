// src/components/common/Input.tsx
import { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle } from 'react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export default function Input({
  label,
  error,
  icon,
  containerStyle,
  ...textInputProps
}: InputProps) {
  const { colors } = useThemeStore();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text
          style={[
            styles.label,
            {
              color: error ? colors.error : colors.text,
              fontFamily: FONTS.body.family,
            },
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: colors.surface,
            borderColor: error ? colors.error : isFocused ? colors.primary : colors.border,
          },
        ]}
      >
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
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
          placeholderTextColor={colors.textTertiary}
        />
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
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: RADIUS.md,
    borderWidth: 2,
    paddingHorizontal: SPACING.md,
  },
  icon: {
    marginRight: SPACING.sm,
  },
  input: {
    flex: 1,
    fontSize: FONT_SIZES.base,
    paddingVertical: SPACING.md,
    fontWeight: '500',
  },
  error: {
    fontSize: FONT_SIZES.xs,
    marginTop: SPACING.xs,
    fontWeight: '500',
  },
});