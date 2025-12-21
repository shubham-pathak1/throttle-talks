// src/screens/home/PostDetailScreen.tsx
import { useState } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';
import ScreenHeader from '../../components/common/ScreenHeader';
import PostCard, { Post } from '../../components/home/PostCard';
import Comment, { CommentType } from '../../components/home/Comment';
import Button from '../../components/common/Button';

// Mock data
const MOCK_POST: Post = {
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
};

const MOCK_COMMENTS: CommentType[] = [
  {
    id: '1',
    author: {
      name: 'Sarah Miller',
      username: 'sarahdrifts',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    content: 'That sounds amazing! What brand did you go with?',
    likes: 12,
    timestamp: '1h',
    isLiked: false,
  },
  {
    id: '2',
    author: {
      name: 'Mike Chen',
      username: 'mikespeed',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    content: 'Nice upgrade! You will definitely feel the difference',
    likes: 8,
    timestamp: '45m',
    isLiked: true,
  },
  {
    id: '3',
    author: {
      name: 'Alex Kim',
      username: 'alexjdm',
      avatar: 'https://i.pravatar.cc/150?img=15',
    },
    content: 'Post a video of the turbo sound! 🔊',
    likes: 15,
    timestamp: '30m',
    isLiked: false,
  },
];

export default function PostDetailScreen() {
  const { colors } = useThemeStore();
  const navigation = useNavigation();
  const [post, setPost] = useState<Post>(MOCK_POST);
  const [comments, setComments] = useState<CommentType[]>(MOCK_COMMENTS);
  const [commentText, setCommentText] = useState('');

  const handleLike = () => {
    setPost({
      ...post,
      isLiked: !post.isLiked,
      likes: post.isLiked ? post.likes - 1 : post.likes + 1,
    });
  };

  const handleCommentLike = (commentId: string) => {
    setComments(
      comments.map((comment) =>
        comment.id === commentId
          ? {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          }
          : comment
      )
    );
  };

  const handlePostComment = () => {
    if (commentText.trim()) {
      console.log('Post comment:', commentText);
      setCommentText('');
      // TODO: Add new comment
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScreenHeader
        title="Post"
        onBack={() => navigation.goBack()}
        onMore={() => console.log('More options')}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Post */}
        <PostCard
          post={post}
          onLike={handleLike}
          onComment={() => console.log('Focus comment input')}
          onShare={() => console.log('Share')}
        />

        {/* Comments Header */}
        <View style={styles.commentsHeader}>
          <Text
            style={[
              styles.commentsTitle,
              { color: colors.text, fontFamily: FONTS.heading.family },
            ]}
          >
            Comments
          </Text>
          <Text
            style={[
              styles.commentsCount,
              { color: colors.textSecondary, fontFamily: FONTS.body.family },
            ]}
          >
            {comments.length}
          </Text>
        </View>

        {/* Comments */}
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            onLike={() => handleCommentLike(comment.id)}
          />
        ))}
      </ScrollView>

      {/* Comment Input */}
      <View style={[styles.inputContainer, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: colors.background,
              color: colors.text,
              fontFamily: FONTS.body.family,
            },
          ]}
          placeholder="Add a comment..."
          placeholderTextColor={colors.textTertiary}
          value={commentText}
          onChangeText={setCommentText}
          multiline
        />
        <Button
          title="Post"
          onPress={handlePostComment}
          variant="primary"
          size="sm"
          disabled={!commentText.trim()}
        />
      </View>
    </KeyboardAvoidingView>
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
  commentsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.lg,
    marginBottom: SPACING.md,
  },
  commentsTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  commentsCount: {
    fontSize: FONT_SIZES.base,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: SPACING.md,
    paddingTop: SPACING.md,
    paddingBottom: 80, // Large padding for Android navigation bar
    gap: SPACING.sm,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
    maxHeight: 100,
  },
});