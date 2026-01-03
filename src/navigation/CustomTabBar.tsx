
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Home, Calendar, Car, User, MessageCircle } from 'lucide-react-native';


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
        {
          paddingBottom: insets.bottom,
          backgroundColor: isDark ? '#000000' : '#FFFFFF',
          borderTopColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
          borderTopWidth: 0.5,
        }
      ]}
    >
      <View style={styles.container}>
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
              <View
                style={[
                  styles.iconWrapper,
                  {
                    backgroundColor: isFocused ? (isDark ? '#1F1F1F' : '#F2F2F2') : 'transparent',
                    opacity: 1 // Always 1, we control icon color via props
                  }
                ]}
              >
                {getIcon(route.name, isFocused)}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
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
    paddingTop: SPACING.sm, // Reduced top padding for better centering
    paddingHorizontal: SPACING.md, // Reduced horizontal padding to fit pills
    justifyContent: 'space-between', // Distribute evenly
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.xs,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30, // Full pill radius
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  // Indicator removed
});