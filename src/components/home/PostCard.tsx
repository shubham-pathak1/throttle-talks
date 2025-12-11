// src/components/home/PostCard.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart, MessageCircle, Share2 } from 'lucide-react-native';
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
    <Card onPress={onPress} padding="md" style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
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
              styles.username,
              { color: colors.textSecondary, fontFamily: FONTS.body.family },
            ]}
          >
            @{post.author.username} · {post.timestamp}
          </Text>
        </View>
      </View>

      {/* Content */}
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

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onLike}
          style={styles.actionButton}
          activeOpacity={0.7}
        >
          <Heart
            color={post.isLiked ? colors.error : colors.textSecondary}
            size={20}
            fill={post.isLiked ? colors.error : 'none'}
            strokeWidth={2}
          />
          <Text
            style={[
              styles.actionText,
              {
                color: post.isLiked ? colors.error : colors.textSecondary,
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
          <MessageCircle color={colors.textSecondary} size={20} strokeWidth={2} />
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
          <Share2 color={colors.textSecondary} size={20} strokeWidth={2} />
        </TouchableOpacity>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 40,
    height: 40,
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
  username: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  content: {
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
    lineHeight: 22,
    marginBottom: SPACING.md,
  },
  postImage: {
    width: '100%',
    height: 300,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.md,
    backgroundColor: '#1A1A1A',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.lg,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  actionText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
});