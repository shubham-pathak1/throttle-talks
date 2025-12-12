// src/screens/home/HomeScreen.tsx
import { useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Search, SlidersHorizontal, Plus } from 'lucide-react-native';
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

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: {
      name: 'John Doe',
      username: 'johndoe',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    content: 'Just installed a new cold air intake on my WRX! The turbo spool is insane now. Definitely worth the investment for anyone looking to boost their performance.',
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
    content: 'Track day at Laguna Seca was incredible! The new suspension setup handles like a dream. Who else is going to the meet this weekend?',
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
    content: 'Finally hit 500hp on the dyno! Years of building and tuning paid off. Full spec list in the comments for anyone interested.',
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
      <View style={styles.header}>
        <Text style={[styles.logo, { color: colors.text, fontFamily: FONTS.heading.family }]}>
          Throttle Talks
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => console.log('Search')}
            activeOpacity={0.7}
          >
            <Search color={colors.text} size={22} strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => console.log('Filter')}
            activeOpacity={0.7}
          >
            <SlidersHorizontal color={colors.text} size={22} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Posts Feed */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.text}
          />
        }
      >
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
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.accent }]}
        onPress={() => console.log('Create post')}
        activeOpacity={0.85}
      >
        <Plus color={colors.background} size={28} strokeWidth={3} />
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
    paddingVertical: SPACING.lg,
  },
  logo: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  fab: {
    position: 'absolute',
    bottom: SPACING['3xl'],
    right: SPACING.lg,
    width: 64,
    height: 64,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF453A',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 12,
  },
});