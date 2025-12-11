// src/screens/home/HomeScreen.tsx
import { useState } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeStore } from '../../store/themeStore';
import { SPACING } from '../../constants/theme';
import PostCard, { Post } from '../../components/home/PostCard';

// Mock data
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
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate API call
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
            onComment={() => console.log('Comment', post.id)}
            onShare={() => console.log('Share', post.id)}
            onPress={() => console.log('View post', post.id)}
          />
        ))}
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
  content: {
    padding: SPACING.lg,
  },
});