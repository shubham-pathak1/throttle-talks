// src/components/home/PostCard.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, MessageSquare, Share2, Bookmark } from 'lucide-react-native';
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
  category?: string;
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
    <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.authorSection} activeOpacity={0.7}>
          <Image source={{ uri: post.author.avatar }} style={styles.avatar} />
          <View style={styles.authorInfo}>
            <View style={styles.nameRow}>
              <Text
                style={[
                  styles.authorName,
                  { color: colors.text, fontFamily: FONTS.body.family },
                ]}
              >
                {post.author.name}
              </Text>
              {post.category && (
                <View style={[styles.categoryBadge, { backgroundColor: colors.accent + '20', borderColor: colors.accent }]}>
                  <Text style={[styles.categoryText, { color: colors.accent, fontFamily: FONTS.body.family }]}>
                    {post.category}
                  </Text>
                </View>
              )}
            </View>
            <Text
              style={[
                styles.timestamp,
                { color: colors.textTertiary, fontFamily: FONTS.body.family },
              ]}
            >
              @{post.author.username} • {post.timestamp}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
        <Text
          style={[
            styles.content,
            { color: colors.text, fontFamily: FONTS.body.family },
          ]}
        >
          {post.content}
        </Text>

        {/* Image */}
        {post.image && (
          <Image source={{ uri: post.image }} style={styles.postImage} />
        )}
      </TouchableOpacity>

      {/* Stats & Actions Bar */}
      <View style={[styles.footer, { borderTopColor: colors.border }]}>
        <View style={styles.stats}>
          <Text style={[styles.statText, { color: colors.textSecondary, fontFamily: FONTS.body.family }]}>
            {post.likes.toLocaleString()} likes
          </Text>
          <Text style={[styles.statDot, { color: colors.textTertiary }]}>•</Text>
          <Text style={[styles.statText, { color: colors.textSecondary, fontFamily: FONTS.body.family }]}>
            {post.comments} comments
          </Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity
            onPress={onLike}
            style={[
              styles.actionButton,
              post.isLiked && { backgroundColor: colors.accent + '15' }
            ]}
            activeOpacity={0.7}
          >
            <Heart
              color={post.isLiked ? colors.accent : colors.textSecondary}
              size={20}
              fill={post.isLiked ? colors.accent : 'none'}
              strokeWidth={2}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onComment}
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <MessageSquare color={colors.textSecondary} size={20} strokeWidth={2} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onShare}
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Share2 color={colors.textSecondary} size={20} strokeWidth={2} />
          </TouchableOpacity>

          <View style={styles.spacer} />

          <TouchableOpacity
            style={styles.actionButton}
            activeOpacity={0.7}
          >
            <Bookmark color={colors.textSecondary} size={20} strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    marginBottom: SPACING.lg,
    overflow: 'hidden',
  },
  header: {
    padding: SPACING.lg,
    paddingBottom: SPACING.md,
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    marginRight: SPACING.md,
  },
  authorInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: 4,
  },
  authorName: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
  },
  categoryBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    borderRadius: RADIUS.xs,
    borderWidth: 1,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  timestamp: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  content: {
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
    lineHeight: 22,
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  postImage: {
    width: '100%',
    height: 320,
    backgroundColor: '#1A1A1A',
  },
  footer: {
    borderTopWidth: 1,
    padding: SPACING.lg,
    paddingTop: SPACING.md,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  statText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
  },
  statDot: {
    fontSize: FONT_SIZES.xs,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  actionButton: {
    padding: SPACING.sm,
    borderRadius: RADIUS.sm,
  },
  spacer: {
    flex: 1,
  },
});