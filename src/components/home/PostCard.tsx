// src/components/home/PostCard.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from 'lucide-react-native';
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
    <View style={[styles.card, { borderBottomColor: colors.border }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.authorSection} onPress={() => console.log('View profile')}>
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
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal color={colors.textSecondary} size={20} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Image */}
      {post.image && (
        <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
          <Image source={{ uri: post.image }} style={styles.postImage} />
        </TouchableOpacity>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity
            onPress={onLike}
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Heart
              color={post.isLiked ? colors.error : colors.text}
              size={26}
              fill={post.isLiked ? colors.error : 'none'}
              strokeWidth={2}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onComment}
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <MessageCircle color={colors.text} size={26} strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onShare}
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Send color={colors.text} size={24} strokeWidth={2} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity activeOpacity={0.7}>
          <Bookmark color={colors.text} size={24} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <TouchableOpacity style={styles.likesSection}>
        <Text
          style={[
            styles.likes,
            { color: colors.text, fontFamily: FONTS.body.family },
          ]}
        >
          {post.likes.toLocaleString()} likes
        </Text>
      </TouchableOpacity>

      {/* Content */}
      <TouchableOpacity onPress={onPress} activeOpacity={1}>
        <Text
          style={[
            styles.content,
            { color: colors.text, fontFamily: FONTS.body.family },
          ]}
        >
          <Text style={styles.username}>@{post.author.username}</Text> {post.content}
        </Text>
      </TouchableOpacity>

      {/* View Comments */}
      {post.comments > 0 && (
        <TouchableOpacity onPress={onComment} style={styles.viewComments}>
          <Text
            style={[
              styles.viewCommentsText,
              { color: colors.textSecondary, fontFamily: FONTS.body.family },
            ]}
          >
            View all {post.comments} comments
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING['2xl'],
    borderBottomWidth: 1,
    paddingBottom: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
  },
  authorInfo: {
    flex: 1,
  },
  authorName: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
    marginBottom: 2,
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
    height: 400,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    backgroundColor: '#1A1A1A',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.sm,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  actionButton: {
    padding: SPACING.xs,
  },
  likesSection: {
    marginBottom: SPACING.xs,
  },
  likes: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
  },
  content: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: SPACING.xs,
  },
  username: {
    fontWeight: '700',
  },
  viewComments: {
    marginTop: SPACING.xs,
  },
  viewCommentsText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});