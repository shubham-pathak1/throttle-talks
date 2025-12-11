// src/components/home/Comment.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Heart } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';

export interface CommentType {
  id: string;
  author: {
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  likes: number;
  timestamp: string;
  isLiked?: boolean;
}

interface CommentProps {
  comment: CommentType;
  onLike?: () => void;
}

export default function Comment({ comment, onLike }: CommentProps) {
  const { colors } = useThemeStore();

  return (
    <View style={styles.container}>
      <Image source={{ uri: comment.author.avatar }} style={styles.avatar} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[
              styles.authorName,
              { color: colors.text, fontFamily: FONTS.body.family },
            ]}
          >
            {comment.author.name}
          </Text>
          <Text
            style={[
              styles.timestamp,
              { color: colors.textTertiary, fontFamily: FONTS.body.family },
            ]}
          >
            {comment.timestamp}
          </Text>
        </View>
        <Text
          style={[
            styles.commentText,
            { color: colors.text, fontFamily: FONTS.body.family },
          ]}
        >
          {comment.content}
        </Text>
        <TouchableOpacity
          onPress={onLike}
          style={styles.likeButton}
          activeOpacity={0.7}
        >
          <Heart
            color={comment.isLiked ? colors.error : colors.textSecondary}
            size={14}
            fill={comment.isLiked ? colors.error : 'none'}
            strokeWidth={2}
          />
          {comment.likes > 0 && (
            <Text
              style={[
                styles.likes,
                {
                  color: comment.isLiked ? colors.error : colors.textSecondary,
                  fontFamily: FONTS.body.family,
                },
              ]}
            >
              {comment.likes}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SPACING.md,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    marginRight: SPACING.sm,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: 4,
  },
  authorName: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
  },
  timestamp: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '500',
  },
  commentText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: SPACING.xs,
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.xs,
  },
  likes: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
});