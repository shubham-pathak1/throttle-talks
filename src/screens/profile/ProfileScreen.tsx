// src/screens/profile/ProfileScreen.tsx
import { useState } from 'react';
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Settings, Share2, Grid3X3, Layers } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import { useThemeStore } from '../../store/themeStore';
import { SPACING, RADIUS, FONTS, FONT_SIZES, COLORS, LAYOUT } from '../../constants/theme';
import ThemeToggle from '../../components/common/ThemeToggle';
import { useAuthStore } from '../../store/authStore';

type TabType = 'posts' | 'garage';

const { width } = Dimensions.get('window');

const MOCK_USER = {
  name: 'Alex Rodriguez',
  username: 'alexrods',
  avatar: 'https://i.pravatar.cc/200?img=3',
  bio: 'Building dreams one mod at a time 🏎️\nTrack enthusiast | JDM lover',
  followers: 1243,
  following: 432,
  posts: 87,
};

const MOCK_POSTS = [
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400',
  'https://images.unsplash.com/photo-1617531653520-bd466356ba66?w=400',
  'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400',
  'https://images.unsplash.com/photo-1614162692292-7ac56d7f6207?w=400',
  'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
  'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400',
];

const MOCK_GARAGE = [
  'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=400',
  'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400',
];

export default function ProfileScreen() {
  const { colors, colorScheme } = useThemeStore();
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState<TabType>('posts');
  const { logout } = useAuthStore();

  const displayImages = activeTab === 'posts' ? MOCK_POSTS : MOCK_GARAGE;
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Actions */}
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Settings' as never)}
            activeOpacity={0.7}
          >
            <Settings color={colors.text} size={24} strokeWidth={2} />
          </TouchableOpacity>
          <View style={styles.headerRight}>
            <ThemeToggle size="md" />
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => logout()} // Temporary logout access
              activeOpacity={0.7}
            >
              <Share2 color={colors.text} size={22} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={colors.gradient.accent as any}
              style={styles.avatarGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={[styles.avatarBorder, { backgroundColor: colors.background }]}>
                <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
              </View>
            </LinearGradient>
          </View>

          <Text style={[styles.name, { color: colors.text, fontFamily: FONTS.heading.family }]}>
            {MOCK_USER.name}
          </Text>
          <Text style={[styles.username, { color: colors.textSecondary, fontFamily: FONTS.body.family }]}>
            @{MOCK_USER.username}
          </Text>

          {MOCK_USER.bio && (
            <Text style={[styles.bio, { color: colors.text, fontFamily: FONTS.body.family }]}>
              {MOCK_USER.bio}
            </Text>
          )}

          {/* Stats */}
          <View style={styles.stats}>
            <TouchableOpacity style={styles.stat} activeOpacity={0.7}>
              <Text style={[styles.statNumber, { color: colors.text, fontFamily: FONTS.heading.family }]}>
                {MOCK_USER.posts}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: FONTS.body.family }]}>
                Posts
              </Text>
            </TouchableOpacity>

            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

            <TouchableOpacity style={styles.stat} activeOpacity={0.7}>
              <Text style={[styles.statNumber, { color: colors.text, fontFamily: FONTS.heading.family }]}>
                {MOCK_USER.followers}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: FONTS.body.family }]}>
                Followers
              </Text>
            </TouchableOpacity>

            <View style={[styles.statDivider, { backgroundColor: colors.border }]} />

            <TouchableOpacity style={styles.stat} activeOpacity={0.7}>
              <Text style={[styles.statNumber, { color: colors.text, fontFamily: FONTS.heading.family }]}>
                {MOCK_USER.following}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary, fontFamily: FONTS.body.family }]}>
                Following
              </Text>
            </TouchableOpacity>
          </View>

          {/* Action Button */}
          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: colors.surfaceElevated, borderColor: colors.border }]}
            onPress={() => navigation.navigate('EditProfile' as never)}
            activeOpacity={0.7}
          >
            <Text style={[styles.editButtonText, { color: colors.text, fontFamily: FONTS.body.family }]}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tabs */}
        <View style={[styles.tabs, { borderBottomColor: colors.border }]}>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('posts')}
            activeOpacity={0.7}
          >
            <Grid3X3
              color={activeTab === 'posts' ? colors.text : colors.textTertiary}
              size={24}
              strokeWidth={activeTab === 'posts' ? 2.5 : 2}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tab}
            onPress={() => setActiveTab('garage')}
            activeOpacity={0.7}
          >
            <Layers
              color={activeTab === 'garage' ? colors.text : colors.textTertiary}
              size={24}
              strokeWidth={activeTab === 'garage' ? 2.5 : 2}
            />
          </TouchableOpacity>

          {/* Animated Indicator */}
          <MotiView
            style={[styles.indicator, { backgroundColor: colors.text }]}
            animate={{
              translateX: activeTab === 'posts' ? 0 : width / 2,
            }}
            transition={{
              type: 'spring',
              damping: 20,
              stiffness: 200,
            }}
          />
        </View>

        {/* Content Grid */}
        <View style={styles.grid}>
          {displayImages.map((image, index) => (
            <TouchableOpacity
              key={index}
              style={styles.gridItem}
              onPress={() => {
                const params = activeTab === 'posts' ? { postId: String(index + 1) } : { vehicleId: String(index + 1) };
                const route = activeTab === 'posts' ? 'PostDetail' : 'VehicleDetail';
                (navigation.navigate as any)(route, params);
              }}
              activeOpacity={0.9}
            >
              <Image
                source={{ uri: image }}
                style={styles.gridImage}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  headerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileSection: {
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING['2xl'],
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.lg,
  },
  avatarGradient: {
    padding: 3,
    borderRadius: RADIUS.full,
  },
  avatarBorder: {
    padding: 3,
    borderRadius: RADIUS.full,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.full,
  },
  name: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '700',
    marginBottom: SPACING.xs,
  },
  username: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    marginBottom: SPACING.md,
  },
  bio: {
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: SPACING.xl,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    height: 32,
  },
  statNumber: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '700',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  editButton: {
    width: '100%',
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full, // Modern pill shape
    alignItems: 'center',
    borderWidth: 1,
  },
  editButtonText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    position: 'relative',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  indicator: {
    position: 'absolute',
    bottom: -1, // Overlap border
    left: 0,
    width: width / 2,
    height: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1A1A1A',
  },
});
