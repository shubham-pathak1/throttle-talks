// src/screens/home/HomeScreen.tsx
import { useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, Text, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Plus, Search, Bell } from 'lucide-react-native';
import { HomeScreenNavigationProp } from '../../types/navigation';
import { useThemeStore } from '../../store/themeStore';
import { SPACING, FONTS, FONT_SIZES, RADIUS } from '../../constants/theme';
import PostCard from '../../components/home/PostCard';

export interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
}

interface Story {
  id: string;
  username: string;
  avatar: string;
  hasStory: boolean;
  isViewed?: boolean;
}

const MOCK_STORIES: Story[] = [
  { id: '1', username: 'Your Story', avatar: 'https://i.pravatar.cc/150?img=3', hasStory: false },
  { id: '2', username: 'johndoe', avatar: 'https://i.pravatar.cc/150?img=1', hasStory: true, isViewed: false },
  { id: '3', username: 'sarahdrifts', avatar: 'https://i.pravatar.cc/150?img=5', hasStory: true, isViewed: false },
  { id: '4', username: 'mikespeed', avatar: 'https://i.pravatar.cc/150?img=8', hasStory: true, isViewed: true },
  { id: '5', username: 'alexjdm', avatar: 'https://i.pravatar.cc/150?img=15', hasStory: true, isViewed: false },
];

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: {
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    content: 'Just installed a new cold air intake on my WRX! The turbo spool is insane now 🔥',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    likes: 234,
    comments: 45,
    timestamp: '2h',
    isLiked: false,
  },
  {
    id: '2',
    author: {
      name: 'Sarah Miller',
      username: 'sarahdrifts',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    content: 'Track day was incredible! The new suspension setup handles like a dream. Who else is going to the meet this weekend?',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    likes: 512,
    comments: 78,
    timestamp: '5h',
    isLiked: true,
  },
  {
    id: '3',
    author: {
      name: 'Mike Chen',
      username: 'mikespeed',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    content: 'Finally hit 500hp on the dyno! Years of building and it paid off 💪',
    likes: 892,
    comments: 156,
    timestamp: '1d',
    isLiked: false,
  },
];

export default function HomeScreen() {
  const { colors } = useThemeStore();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Text style={[styles.logo, { color: colors.text, fontFamily: FONTS.heading.family }]}>
          THROTTLE
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.surface }]}
            onPress={() => console.log('Search')}
          >
            <Search color={colors.text} size={20} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.surface }]}
            onPress={() => console.log('Notifications')}
          >
            <Bell color={colors.text} size={20} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.text}
          />
        }
      >
        {/* Stories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storiesContainer}
          contentContainerStyle={styles.storiesContent}
        >
          {MOCK_STORIES.map((story, index) => (
            <TouchableOpacity
              key={story.id}
              style={styles.storyItem}
              onPress={() => console.log('View story', story.id)}
            >
              <View
                style={[
                  styles.storyRing,
                  {
                    borderColor: index === 0 ? colors.border : story.isViewed ? colors.border : colors.accent,
                  },
                ]}
              >
                <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
                {index === 0 && (
                  <View style={[styles.addStoryButton, { backgroundColor: colors.primary }]}>
                    <Plus color={colors.background} size={16} strokeWidth={3} />
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.storyUsername,
                  { color: colors.text, fontFamily: FONTS.body.family },
                ]}
                numberOfLines={1}
              >
                {story.username}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Posts */}
        <View style={styles.postsContainer}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => handleLike(post.id)}
              onComment={() => navigation.navigate('PostDetail', { postId: post.id })}
              onShare={() => console.log('Share', post.id)}
              onPress={() => navigation.navigate('PostDetail', { postId: post.id })}
            />
          ))}
        </View>
      </ScrollView>

      {/* Floating Create Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => console.log('Create post')}
        activeOpacity={0.8}
      >
        <Plus color={colors.background} size={28} strokeWidth={2.5} />
      </TouchableOpacity>
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
  logo: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '700',
    letterSpacing: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  storiesContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  storiesContent: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
  },
  storyItem: {
    alignItems: 'center',
    width: 72,
  },
  storyRing: {
    width: 68,
    height: 68,
    borderRadius: RADIUS.full,
    borderWidth: 2.5,
    padding: 3,
    marginBottom: SPACING.xs,
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: RADIUS.full,
  },
  addStoryButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 24,
    height: 24,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyUsername: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  postsContainer: {
    padding: SPACING.lg,
  },
  fab: {
    position: 'absolute',
    bottom: SPACING['2xl'],
    right: SPACING.lg,
    width: 56,
    height: 56,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});