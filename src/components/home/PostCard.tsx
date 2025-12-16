// src/components/home/PostCard.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Share2, MoreVertical } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';
import Card from '../common/Card';

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
    <Card
      onPress={onPress}
      padding="none" // Custom padding management
      style={styles.card}
      elevated={true}
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
              @{post.author.username} • {post.timestamp}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.moreButton} activeOpacity={0.7}>
          <MoreVertical color={colors.textSecondary} size={20} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Image */}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />
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
            size={24}
            fill={post.isLiked ? colors.accent : 'none'}
            strokeWidth={2}
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
          <MessageCircle color={colors.textSecondary} size={24} strokeWidth={2} />
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
          <Share2 color={colors.textSecondary} size={22} strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.xl, // Increased margin for cleaner separation
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.md,
    paddingBottom: SPACING.sm,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    marginRight: SPACING.md,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
    marginBottom: 0,
  },
  timestamp: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '500',
  },
  moreButton: {
    padding: SPACING.xs,
  },
  postImage: {
    width: '100%',
    height: 400, // Taller, more immersive images
    backgroundColor: '#1A1A1A',
  },
  contentSection: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  content: {
    fontSize: FONT_SIZES.base,
    fontWeight: '400',
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.xs,
    gap: SPACING['2xl'],
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  actionText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});
