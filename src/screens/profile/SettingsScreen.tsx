// src/screens/profile/SettingsScreen.tsx
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeft, ChevronRight, Bell, Lock, Globe, HelpCircle, LogOut, Trash2 } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';

export default function SettingsScreen() {
  const { colors, toggleTheme } = useThemeStore();
  const navigation = useNavigation();

  const SettingItem = ({ 
    icon: Icon, 
    title, 
    subtitle, 
    onPress, 
    showArrow = true,
    rightElement 
  }: { 
    icon: any; 
    title: string; 
    subtitle?: string; 
    onPress?: () => void;
    showArrow?: boolean;
    rightElement?: React.ReactNode;
  }) => (
    <TouchableOpacity
      style={[styles.settingItem, { borderBottomColor: colors.border }]}
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.settingLeft}>
        <View style={[styles.iconContainer, { backgroundColor: colors.surface }]}>
          <Icon color={colors.text} size={20} strokeWidth={2} />
        </View>
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: colors.text, fontFamily: FONTS.body.family }]}>
            {title}
          </Text>
          {subtitle && (
            <Text style={[styles.settingSubtitle, { color: colors.textSecondary, fontFamily: FONTS.body.family }]}>
              {subtitle}
            </Text>
          )}
        </View>
      </View>
      {rightElement || (showArrow && (
        <ChevronRight color={colors.textTertiary} size={20} strokeWidth={2} />
      ))}
    </TouchableOpacity>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <Text style={[styles.sectionHeader, { color: colors.textSecondary, fontFamily: FONTS.body.family }]}>
      {title}
    </Text>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          activeOpacity={0.7}
        >
          <ChevronLeft color={colors.text} size={28} strokeWidth={2.5} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text, fontFamily: FONTS.heading.family }]}>
          Settings
        </Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Preferences */}
        <SectionHeader title="PREFERENCES" />
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <SettingItem
            icon={Bell}
            title="Notifications"
            subtitle="Push notifications, email alerts"
            onPress={() => console.log('Notifications')}
          />
          <SettingItem
            icon={Globe}
            title="Language"
            subtitle="English (US)"
            onPress={() => console.log('Language')}
          />
        </View>

        {/* Privacy & Security */}
        <SectionHeader title="PRIVACY & SECURITY" />
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <SettingItem
            icon={Lock}
            title="Privacy"
            subtitle="Blocked users, visibility"
            onPress={() => console.log('Privacy')}
          />
        </View>

        {/* Support */}
        <SectionHeader title="SUPPORT" />
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <SettingItem
            icon={HelpCircle}
            title="Help Center"
            subtitle="FAQs and support"
            onPress={() => console.log('Help')}
          />
        </View>

        {/* Account Actions */}
        <SectionHeader title="ACCOUNT" />
        <View style={[styles.section, { backgroundColor: colors.surface }]}>
          <SettingItem
            icon={LogOut}
            title="Log Out"
            onPress={() => console.log('Log out')}
            showArrow={false}
          />
          <SettingItem
            icon={Trash2}
            title="Delete Account"
            subtitle="Permanently delete your account"
            onPress={() => console.log('Delete account')}
            showArrow={false}
          />
        </View>

        {/* App Info */}
        <Text style={[styles.version, { color: colors.textTertiary, fontFamily: FONTS.body.family }]}>
          Throttle Talks v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  sectionHeader: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: SPACING.xl,
    marginBottom: SPACING.sm,
    paddingHorizontal: SPACING.xs,
  },
  section: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginBottom: SPACING.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderBottomWidth: 1,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: SPACING.md,
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  version: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: SPACING['2xl'],
    marginBottom: SPACING.xl,
  },
});