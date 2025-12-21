// src/screens/home/HomeScreen.tsx
import { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Search, SlidersHorizontal, Plus, Bell } from 'lucide-react-native';
import { MotiView } from 'moti';
import * as Haptics from 'expo-haptics';
import { HomeScreenNavigationProp } from '../../types/navigation';
import { useThemeStore } from '../../store/themeStore';
import { SPACING, FONTS, FONT_SIZES, RADIUS, LAYOUT, ANIMATIONS } from '../../constants/theme';
import PostCard, { Post } from '../../components/home/PostCard';
import ReviewCard, { Review } from '../../components/home/ReviewCard';
import PollCard, { Poll } from '../../components/home/PollCard';
import QuestionCard, { Question } from '../../components/home/QuestionCard';
import ModShowcaseCard, { ModShowcase } from '../../components/home/ModShowcaseCard';
import Input from '../../components/common/Input';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Feed item types
type FeedItem = (Post & { type: 'post' }) | Review | Poll | Question | ModShowcase;

const CATEGORIES = ['All', 'Posts', 'Reviews', 'Mods', 'Polls', 'Q&A'];

// Mock data with different content types
const MOCK_FEED: FeedItem[] = [
  {
    id: '1',
    type: 'post',
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
    type: 'poll',
    author: {
      name: 'Track Day Enthusiast',
      username: 'trackdayenthusiast',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    question: 'Best coilover brand for daily driving + occasional track use?',
    options: [
      { id: 'a', text: 'KW V3', votes: 156 },
      { id: 'b', text: 'Ohlins Road & Track', votes: 203 },
      { id: 'c', text: 'HKS Hipermax', votes: 89 },
      { id: 'd', text: 'Fortune Auto 500', votes: 127 },
    ],
    totalVotes: 575,
    timestamp: '3h',
  },
  {
    id: '3',
    type: 'review',
    author: {
      name: 'Sarah Miller',
      username: 'sarahdrifts',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    vehicle: {
      make: 'Mazda',
      model: 'MX-5 RF',
      year: '2024',
    },
    rating: 5,
    title: 'Perfect weekend warrior',
    content: 'After 6 months of ownership, this is everything I dreamed of. The RF roof is a game changer - you get the best of both worlds.',
    pros: ['Incredible handling', 'Beautiful design', 'Great fuel economy'],
    cons: ['Limited storage', 'Could use more power'],
    helpfulCount: 47,
    timestamp: '5h',
    image: 'https://images.unsplash.com/photo-1555626906-fcf25c2df6ee?w=800',
  },
  {
    id: '4',
    type: 'mod',
    author: {
      name: 'Mike Chen',
      username: 'mikespeed',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    modName: 'Invidia Q300 Cat-Back Exhaust',
    brand: 'Invidia',
    price: '$980',
    difficulty: 'Medium',
    beforeImage: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
    afterImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f6207?w=800',
    description: 'Deep tone at idle, aggressive under load. Perfect balance of sound without drone on the highway.',
    timestamp: '8h',
    saved: false,
  },
  {
    id: '5',
    type: 'question',
    author: {
      name: 'Alex Kim',
      username: 'alexjdm',
      avatar: 'https://i.pravatar.cc/150?img=15',
    },
    title: 'E85 tune worth it for daily driving?',
    body: 'Thinking about getting a flex fuel kit and E85 tune for my STI. Anyone running this setup daily? Curious about real-world MPG and if finding E85 is actually a hassle.',
    tags: ['STI', 'E85', 'Tuning'],
    answerCount: 23,
    timestamp: '1d',
    topAnswer: {
      author: 'TunerMike',
      preview: 'Running E85 daily for 2 years now. The power gains are real (about 50whp on my setup), but you\'ll see 20-25% worse MPG...',
    },
  },
  {
    id: '6',
    type: 'post',
    author: {
      name: 'Laura Thompson',
      username: 'lauratracks',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    content: 'Finally hit 500hp on the dyno! Years of building and tuning paid off. Full spec list in the comments for anyone interested.',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
    likes: 892,
    comments: 156,
    timestamp: '1d',
    isLiked: true,
  },
];

export default function HomeScreen() {
  const { colors, colorScheme } = useThemeStore();
  const isDark = colorScheme === 'dark';
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [feed, setFeed] = useState<FeedItem[]>(MOCK_FEED);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const handleCategoryPress = (category: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveCategory(category);
  };

  const handleLike = (postId: string) => {
    setFeed(
      feed.map((item) =>
        item.id === postId && item.type === 'post'
          ? {
            ...item,
            isLiked: !item.isLiked,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1,
          }
          : item
      )
    );
  };

  const filteredFeed = feed.filter((item) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Posts') return item.type === 'post';
    if (activeCategory === 'Reviews') return item.type === 'review';
    if (activeCategory === 'Mods') return item.type === 'mod';
    if (activeCategory === 'Polls') return item.type === 'poll';
    if (activeCategory === 'Q&A') return item.type === 'question';
    return true;
  });

  const renderFeedItem = (item: FeedItem) => {
    switch (item.type) {
      case 'post':
        return (
          <PostCard
            key={item.id}
            post={item}
            onLike={() => handleLike(item.id)}
            onComment={() => navigation.navigate('PostDetail', { postId: item.id })}
            onShare={() => console.log('Share', item.id)}
            onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
          />
        );
      case 'review':
        return (
          <ReviewCard
            key={item.id}
            review={item}
            onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
            onHelpful={() => console.log('Helpful', item.id)}
          />
        );
      case 'poll':
        return (
          <PollCard
            key={item.id}
            poll={item}
            onVote={(optionId) => console.log('Vote', item.id, optionId)}
          />
        );
      case 'question':
        return (
          <QuestionCard
            key={item.id}
            question={item}
            onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
            onAnswer={() => console.log('Answer', item.id)}
          />
        );
      case 'mod':
        return (
          <ModShowcaseCard
            key={item.id}
            mod={item}
            onPress={() => navigation.navigate('PostDetail', { postId: item.id })}
            onSave={() => console.log('Save', item.id)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={[styles.logo, { color: colors.text, fontFamily: FONTS.heading.family }]}>
            Throttle Talks
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity
              style={[styles.iconButton, { backgroundColor: isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)' }]}
              activeOpacity={0.7}
            >
              <Bell color={colors.text} size={20} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Input
            placeholder="Search posts, builds, people..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            containerStyle={{ marginBottom: 0, flex: 1 }}
            icon={<Search color={colors.textSecondary} size={20} />}
          />
          <TouchableOpacity
            style={[styles.filterButton, { backgroundColor: colors.surface, borderColor: colors.border }]}
            activeOpacity={0.7}
          >
            <SlidersHorizontal color={colors.text} size={20} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        {/* Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category;
            return (
              <TouchableOpacity
                key={category}
                onPress={() => handleCategoryPress(category)}
                activeOpacity={0.7}
              >
                <MotiView
                  animate={{
                    backgroundColor: isActive
                      ? colors.text
                      : isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  }}
                  transition={{ type: 'timing', duration: ANIMATIONS.fast }}
                  style={styles.categoryTab}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      { color: isActive ? colors.background : colors.textSecondary },
                    ]}
                  >
                    {category}
                  </Text>
                </MotiView>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Feed */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.text}
            colors={[colors.text]}
          />
        }
      >
        {filteredFeed.map((item, index) => (
          <MotiView
            key={item.id}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: index * 50, type: 'timing', duration: 300 }}
          >
            {renderFeedItem(item)}
          </MotiView>
        ))}
        <View style={{ height: LAYOUT.bottomSpacer }} />
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.text }]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          navigation.navigate('CreatePost' as never);
        }}
        activeOpacity={0.88}
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
    paddingBottom: SPACING.sm,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.sm,
    marginBottom: SPACING.md,
  },
  logo: {
    fontSize: FONT_SIZES['2xl'],
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
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    gap: SPACING.sm,
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  filterButton: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: SPACING.lg,
    gap: SPACING.sm,
    paddingBottom: SPACING.xs,
  },
  categoryTab: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
  },
  categoryText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    fontFamily: FONTS.body.family,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
    paddingTop: SPACING.md,
  },
  fab: {
    position: 'absolute',
    bottom: LAYOUT.fabBottom,
    right: SPACING.lg,
    width: 56,
    height: 56,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
});
