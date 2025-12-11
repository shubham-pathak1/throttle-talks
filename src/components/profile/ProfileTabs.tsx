// src/components/profile/ProfileTabs.tsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Grid3X3, Car } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING } from '../../constants/theme';

type TabType = 'posts' | 'garage';

interface ProfileTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function ProfileTabs({ activeTab, onTabChange }: ProfileTabsProps) {
  const { colors } = useThemeStore();

  return (
    <View style={[styles.container, { borderBottomColor: colors.border }]}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => onTabChange('posts')}
        activeOpacity={0.7}
      >
        <Grid3X3
          color={activeTab === 'posts' ? colors.text : colors.textTertiary}
          size={24}
          strokeWidth={activeTab === 'posts' ? 2.5 : 2}
        />
        {activeTab === 'posts' && (
          <View style={[styles.indicator, { backgroundColor: colors.primary }]} />
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => onTabChange('garage')}
        activeOpacity={0.7}
      >
        <Car
          color={activeTab === 'garage' ? colors.text : colors.textTertiary}
          size={24}
          strokeWidth={activeTab === 'garage' ? 2.5 : 2}
        />
        {activeTab === 'garage' && (
          <View style={[styles.indicator, { backgroundColor: colors.primary }]} />
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.md,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
  },
});