import { BlurView } from 'expo-blur';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Home, Calendar, Car, User, MessageCircle } from 'lucide-react-native';
import { MotiView } from 'moti';

import { useThemeStore } from '../store/themeStore';
import { SPACING, RADIUS, LAYOUT, ANIMATIONS } from '../constants/theme';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, colorScheme } = useThemeStore();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';

  const getIcon = (routeName: string, isFocused: boolean) => {
    const iconColor = isFocused ? colors.text : colors.textTertiary;
    const iconSize = 24;
    const strokeWidth = isFocused ? 2.5 : 1.8;

    switch (routeName) {
      case 'HomeTab':
        return <Home color={iconColor} size={iconSize} strokeWidth={strokeWidth} />;
      case 'MeetupsTab':
        return <Calendar color={iconColor} size={iconSize} strokeWidth={strokeWidth} />;
      case 'GarageTab':
        return <Car color={iconColor} size={iconSize} strokeWidth={strokeWidth} />;
      case 'ProfileTab':
        return <User color={iconColor} size={iconSize} strokeWidth={strokeWidth} />;
      case 'ChatTab':
        return <MessageCircle color={iconColor} size={iconSize} strokeWidth={strokeWidth} />;
      default:
        return <Home color={iconColor} size={iconSize} strokeWidth={strokeWidth} />;
    }
  };

  return (
    <View
      style={[
        styles.wrapper,
        { paddingBottom: Math.max(insets.bottom, 12) }
      ]}
    >
      <BlurView
        intensity={120}
        tint={isDark ? 'dark' : 'light'}
        style={[
          styles.container,
          {
            backgroundColor: isDark ? 'rgba(8, 8, 8, 0.95)' : 'rgba(255, 255, 255, 0.98)',
            borderTopColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
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
              style={styles.tab}
              activeOpacity={0.7}
            >
              {/* Glowing background for active tab */}
              <MotiView
                animate={{
                  opacity: isFocused ? 1 : 0,
                  scale: isFocused ? 1 : 0.8,
                }}
                transition={{
                  type: 'spring',
                  damping: ANIMATIONS.spring.damping,
                  stiffness: ANIMATIONS.spring.stiffness,
                }}
                style={[
                  styles.activeBackground,
                  { backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.04)' }
                ]}
              />

              <MotiView
                animate={{
                  scale: isFocused ? 1.05 : 1,
                  translateY: isFocused ? -2 : 0,
                }}
                transition={{
                  type: 'spring',
                  damping: ANIMATIONS.springBouncy.damping,
                  stiffness: ANIMATIONS.springBouncy.stiffness,
                }}
                style={styles.iconWrapper}
              >
                {getIcon(route.name, isFocused)}
              </MotiView>

              {/* Active indicator line */}
              <MotiView
                animate={{
                  opacity: isFocused ? 1 : 0,
                  scaleX: isFocused ? 1 : 0,
                  width: isFocused ? 20 : 4,
                }}
                transition={{
                  type: 'spring',
                  damping: 25,
                  stiffness: 400,
                }}
                style={[styles.indicator, { backgroundColor: colors.text }]}
              />
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    paddingTop: SPACING.md,
    paddingHorizontal: SPACING.lg,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
    position: 'relative',
  },
  activeBackground: {
    position: 'absolute',
    width: 56,
    height: 40,
    borderRadius: RADIUS.lg,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 36,
  },
  indicator: {
    height: 3,
    borderRadius: 1.5,
    marginTop: 6,
  },
});