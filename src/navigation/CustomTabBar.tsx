// src/navigation/CustomTabBar.tsx
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Gauge, CalendarDays, Warehouse, UserCircle, MessagesSquare } from 'lucide-react-native';

import { useThemeStore } from '../store/themeStore';
import { SPACING, RADIUS, LAYOUT } from '../constants/theme';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors } = useThemeStore();
  const insets = useSafeAreaInsets();

  const getIcon = (routeName: string, isFocused: boolean) => {
    const iconColor = isFocused ? colors.text : colors.textTertiary;
    const iconSize = 24;

    switch (routeName) {
      case 'HomeTab':
        return <Gauge color={iconColor} size={iconSize} strokeWidth={isFocused ? 2.5 : 2} />;
      case 'MeetupsTab':
        return <CalendarDays color={iconColor} size={iconSize} strokeWidth={isFocused ? 2.5 : 2} />;
      case 'GarageTab':
        return <Warehouse color={iconColor} size={iconSize} strokeWidth={isFocused ? 2.5 : 2} />;
      case 'ProfileTab':
        return <UserCircle color={iconColor} size={iconSize} strokeWidth={isFocused ? 2.5 : 2} />;
      case 'ChatTab':
        return <MessagesSquare color={iconColor} size={iconSize} strokeWidth={isFocused ? 2.5 : 2} />;
      default:
        return <Gauge color={iconColor} size={iconSize} />;
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
            // Haptic feedback
            if (Platform.OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }
            navigation.navigate(route.name);
          }
        };

        const animatedStyle = useAnimatedStyle(() => {
          return {
            transform: [
              {
                scale: withSpring(isFocused ? 1 : 0.9, {
                  damping: 15,
                  stiffness: 150,
                }),
              },
            ],
            opacity: withSpring(isFocused ? 1 : 0.6),
          };
        });

        return (
          <AnimatedTouchable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={[styles.tab, animatedStyle]}
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
          </AnimatedTouchable>
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