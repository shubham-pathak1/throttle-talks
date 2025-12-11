// src/screens/profile/ProfileScreen.tsx
import { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../../store/themeStore';
import { SPACING, RADIUS } from '../../constants/theme';
import ProfileHeader from '../../components/profile/ProfileHeader';
import ProfileTabs from '../../components/profile/ProfileTabs';
import ThemeToggle from '../../components/common/ThemeToggle';

type TabType = 'posts' | 'garage';

const MOCK_USER = {
  name: 'Alex Rodriguez',
  username: 'alexrods',
  avatar: 'https://i.pravatar.cc/200?img=3',
  bio: 'Car enthusiast 🏎️ | Track days | Building a 600hp beast | DM for collabs',
  followers: 1243,
  following: 432,
  posts: 87,
};

// Mock post images
const MOCK_POSTS = [
  'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400',
  'https://images.unsplash.com/photo-1617531653520-bd466356ba66?w=400',
  'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400',
];

// Mock garage images
const MOCK_GARAGE = [
  'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=400',
  'https://images.unsplash.com/photo-1581540222194-0def2dda95b8?w=400',
];

export default function ProfileScreen() {
  const { colors } = useThemeStore();
  const [activeTab, setActiveTab] = useState<TabType>('posts');

  const handleEditProfile = () => {
    console.log('Edit profile');
    // TODO: Navigate to edit profile screen
  };

  const handleSettings = () => {
    console.log('Settings');
    // TODO: Navigate to settings screen
  };

  const handleShare = () => {
    console.log('Share profile');
    // TODO: Open share sheet
  };

  const displayImages = activeTab === 'posts' ? MOCK_POSTS : MOCK_GARAGE;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <ProfileHeader
          user={MOCK_USER}
          isOwnProfile={true}
          onEditProfile={handleEditProfile}
          onSettings={handleSettings}
          onShare={handleShare}
          onFollowersPress={() => console.log('View followers')}
          onFollowingPress={() => console.log('View following')}
        />

        {/* Tabs */}
        <ProfileTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Content Grid */}
        <View style={styles.grid}>
          {displayImages.map((image, index) => (
            <View key={index} style={styles.gridItem}>
              <Image
                source={{ uri: image }}
                style={styles.gridImage}
              />
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Theme Toggle */}
      <View style={styles.floatingButton}>
        <ThemeToggle />
      </View>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 2,
  },
  gridItem: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 2,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.xs,
    backgroundColor: '#1A1A1A',
  },
  floatingButton: {
    position: 'absolute',
    bottom: SPACING['2xl'],
    right: SPACING.lg,
  },
});