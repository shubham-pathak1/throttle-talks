import { BlurView } from 'expo-blur';
import { View, TouchableOpacity, StyleSheet, Platform, Dimensions } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Gauge, CalendarDays, Warehouse, UserCircle, MessagesSquare } from 'lucide-react-native';
import { MotiView } from 'moti';

import { useThemeStore } from '../store/themeStore';
import { SPACING, RADIUS, COLORS } from '../constants/theme';

const { width } = Dimensions.get('window');

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { colors, colorScheme } = useThemeStore();
  const insets = useSafeAreaInsets();
  const isDark = colorScheme === 'dark';

  const getIcon = (routeName: string, isFocused: boolean) => {
    // Icons are strictly black/white based on theme text color
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
    <View style={styles.containerWrapper} pointerEvents="box-none">
      <BlurView
        intensity={isDark ? 80 : 95} // Increased intensity
        tint={isDark ? 'dark' : 'light'}
        style={[
          styles.container,
          {
            backgroundColor: isDark ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)', // Tint
            borderColor: 'rgba(255,255,255,0.1)',
            paddingBottom: Platform.OS === 'ios' ? SPACING.md : SPACING.sm,
            marginBottom: insets.bottom + SPACING.sm,
            overflow: 'hidden',
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
              <View style={styles.iconContainer}>
                {getIcon(route.name, isFocused)}
                {isFocused && (
                  <MotiView
                    from={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', damping: 15 }}
                    style={[styles.indicator, { backgroundColor: colors.accent }]}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  containerWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    width: width - SPACING.lg * 2, // Floating width
    borderRadius: RADIUS['2xl'],
    borderWidth: 1,
    paddingTop: SPACING.sm,
    paddingHorizontal: SPACING.md,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, // Stronger shadow for floating effect
    shadowRadius: 12,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
  },
  indicator: {
    position: 'absolute',
    bottom: -6,
    width: 4,
    height: 4,
    borderRadius: RADIUS.full,
  },
});