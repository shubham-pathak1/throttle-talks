import { BlurView } from 'expo-blur';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Home, Calendar, Car, User, MessageCircle } from 'lucide-react-native';
import { MotiView } from 'moti';

import { useThemeStore } from '../store/themeStore';
import { SPACING, RADIUS, LAYOUT } from '../constants/theme';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, colorScheme } = useThemeStore();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';

  const getIcon = (routeName: string, isFocused: boolean) => {
    const iconColor = isFocused ? colors.text : colors.textTertiary;
    const iconSize = 22;
    const strokeWidth = isFocused ? 2.5 : 1.5;

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
        { paddingBottom: Math.max(insets.bottom, 8) }
      ]}
    >
      <BlurView
        intensity={100}
        tint={isDark ? 'dark' : 'light'}
        style={[
          styles.container,
          {
            // SOLID glassmorphism - not transparent
            backgroundColor: isDark ? 'rgba(10, 10, 10, 0.92)' : 'rgba(255, 255, 255, 0.95)',
            borderTopColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
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
              activeOpacity={0.6}
            >
              <MotiView
                animate={{
                  scale: isFocused ? 1 : 0.95,
                  opacity: isFocused ? 1 : 0.6,
                }}
                transition={{ type: 'timing', duration: 150 }}
                style={styles.iconWrapper}
              >
                {getIcon(route.name, isFocused)}
              </MotiView>

              {/* Active indicator dot */}
              <MotiView
                animate={{
                  opacity: isFocused ? 1 : 0,
                  scale: isFocused ? 1 : 0,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
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
    borderTopWidth: 1,
    paddingTop: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.sm,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
  },
  indicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginTop: 4,
  },
});