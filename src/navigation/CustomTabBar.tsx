// src/navigation/CustomTabBar.tsx
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Home, Calendar, Car, User, MessageCircle } from 'lucide-react-native';

import { useThemeStore } from '../store/themeStore';
import { SPACING, RADIUS } from '../constants/theme';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useThemeStore();
  const insets = useSafeAreaInsets();

  const getIcon = (routeName: string, isFocused: boolean) => {
    const iconColor = isFocused ? colors.text : colors.textTertiary;
    const iconSize = 24;

    switch (routeName) {
      case 'HomeTab':
        return <Home color={iconColor} size={iconSize} strokeWidth={isFocused ? 2.5 : 2} />;
      case 'MeetupsTab':
        return <Calendar color={iconColor} size={iconSize} strokeWidth={isFocused ? 2.5 : 2} />;
      case 'GarageTab':
        return <Car color={iconColor} size={iconSize} strokeWidth={isFocused ? 2.5 : 2} />;
      case 'ProfileTab':
        return <User color={iconColor} size={iconSize} strokeWidth={isFocused ? 2.5 : 2} />;
      case 'ChatTab':
        return <MessageCircle color={iconColor} size={iconSize} strokeWidth={isFocused ? 2.5 : 2} />;
      default:
        return <Home color={iconColor} size={iconSize} />;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          paddingBottom: insets.bottom || SPACING.sm,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            if (Platform.OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={[
              styles.tab,
              { opacity: isFocused ? 1 : 0.6 }
            ]}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.iconContainer,
                isFocused && {
                  backgroundColor: colors.surfaceElevated,
                },
              ]}
            >
              {getIcon(route.name, isFocused)}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
    borderTopWidth: 1,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    padding: SPACING.sm,
    borderRadius: RADIUS.md,
  },
});