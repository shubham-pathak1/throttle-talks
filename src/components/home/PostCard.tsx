// src/components/home/PostCard.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';

export interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  timestamp: string;
  isLiked?: boolean;
}

interface PostCardProps {
  post: Post;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onPress?: () => void;
}

export default function PostCard({
  post,
  onLike,
  onComment,
  onShare,
  onPress,
}: PostCardProps) {
  const { colors } = useThemeStore();

  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: colors.surface }]} 
      onPress={onPress}
      activeOpacity={0.98}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.authorSection}>
          <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
          <View style={styles.authorInfo}>
            <Text
              style={[
                styles.authorName,
                { color: colors.text, fontFamily: FONTS.body.family },
              ]}
            >
              {post.author.name}
            </Text>
            <Text
              style={[
                styles.timestamp,
                { color: colors.textSecondary, fontFamily: FONTS.body.family },
              ]}
            >
              {post.timestamp}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
          <MoreVertical color={colors.textSecondary} size={20} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Image */}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      {/* Content */}
      <View style={styles.contentSection}>
        <Text
          style={[
            styles.content,
            { color: colors.text, fontFamily: FONTS.body.family },
          ]}
          numberOfLines={3}
        >
          {post.content}
        </Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onLike}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Heart
            color={post.isLiked ? colors.accent : colors.textSecondary}
            size={22}
            fill={post.isLiked ? colors.accent : 'none'}
            strokeWidth={2.5}
          />
          <Text
            style={[
              styles.actionText,
              {
                color: post.isLiked ? colors.accent : colors.textSecondary,
                fontFamily: FONTS.body.family,
              },
            ]}
          >
            {post.likes}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onComment}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <MessageCircle color={colors.textSecondary} size={22} strokeWidth={2.5} />
          <Text
            style={[
              styles.actionText,
              { color: colors.textSecondary, fontFamily: FONTS.body.family },
            ]}
          >
            {post.comments}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onShare}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Share2 color={colors.textSecondary} size={20} strokeWidth={2.5} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.xl,
    marginBottom: SPACING['2xl'],
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.md,
    marginRight: SPACING.md,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  moreButton: {
    padding: SPACING.xs,
  },
  postImage: {
    width: '100%',
    height: 360,
    backgroundColor: '#1A1A1A',
  },
  contentSection: {
    padding: SPACING.lg,
    paddingTop: SPACING.md,
  },
  content: {
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    gap: SPACING.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  actionText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
  },
});