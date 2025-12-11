// src/components/common/ThemeToggle.tsx
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Sun, Moon } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { RADIUS, SPACING } from '../../constants/theme';

interface ThemeToggleProps {
  size?: 'sm' | 'md' | 'lg';
}

export default function ThemeToggle({ size = 'md' }: ThemeToggleProps) {
  const { colors, colorScheme, toggleTheme } = useThemeStore();

  const iconSize = size === 'sm' ? 18 : size === 'md' ? 20 : 24;
  const buttonSize = size === 'sm' ? 36 : size === 'md' ? 40 : 48;

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={[
        styles.button,
        {
          backgroundColor: colors.surface,
          width: buttonSize,
          height: buttonSize,
        },
      ]}
      activeOpacity={0.7}
    >
      {colorScheme === 'dark' ? (
        <Sun color={colors.text} size={iconSize} strokeWidth={2} />
      ) : (
        <Moon color={colors.text} size={iconSize} strokeWidth={2} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
});