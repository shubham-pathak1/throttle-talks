// src/components/profile/ProfileHeader.tsx
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Settings, Share2 } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';
import Button from '../common/Button';

interface ProfileHeaderProps {
  user: {
    name: string;
    username: string;
    avatar: string;
    bio: string;
    followers: number;
    following: number;
    posts: number;
  };
  isOwnProfile?: boolean;
  onEditProfile?: () => void;
  onSettings?: () => void;
  onShare?: () => void;
  onFollowersPress?: () => void;
  onFollowingPress?: () => void;
}

export default function ProfileHeader({
  user,
  isOwnProfile = true,
  onEditProfile,
  onSettings,
  onShare,
  onFollowersPress,
  onFollowingPress,
}: ProfileHeaderProps) {
  const { colors } = useThemeStore();

  return (
    <View style={styles.container}>
      {/* Top Actions */}
      <View style={styles.topActions}>
        <TouchableOpacity
          onPress={onSettings}
          style={[styles.iconButton, { backgroundColor: colors.surface }]}
          activeOpacity={0.7}
        >
          <Settings color={colors.text} size={20} strokeWidth={2} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onShare}
          style={[styles.iconButton, { backgroundColor: colors.surface }]}
          activeOpacity={0.7}
        >
          <Share2 color={colors.text} size={20} strokeWidth={2} />
        </TouchableOpacity>
      </View>

      {/* Avatar & Stats */}
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text
              style={[
                styles.statValue,
                { color: colors.text, fontFamily: FONTS.heading.family },
              ]}
            >
              {user.posts}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: colors.textSecondary, fontFamily: FONTS.body.family },
              ]}
            >
              Posts
            </Text>
          </View>

          <TouchableOpacity style={styles.stat} onPress={onFollowersPress} activeOpacity={0.7}>
            <Text
              style={[
                styles.statValue,
                { color: colors.text, fontFamily: FONTS.heading.family },
              ]}
            >
              {user.followers}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: colors.textSecondary, fontFamily: FONTS.body.family },
              ]}
            >
              Followers
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.stat} onPress={onFollowingPress} activeOpacity={0.7}>
            <Text
              style={[
                styles.statValue,
                { color: colors.text, fontFamily: FONTS.heading.family },
              ]}
            >
              {user.following}
            </Text>
            <Text
              style={[
                styles.statLabel,
                { color: colors.textSecondary, fontFamily: FONTS.body.family },
              ]}
            >
              Following
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Name & Bio */}
      <View style={styles.info}>
        <Text
          style={[
            styles.name,
            { color: colors.text, fontFamily: FONTS.heading.family },
          ]}
        >
          {user.name}
        </Text>
        <Text
          style={[
            styles.username,
            { color: colors.textSecondary, fontFamily: FONTS.body.family },
          ]}
        >
          @{user.username}
        </Text>
        {user.bio && (
          <Text
            style={[
              styles.bio,
              { color: colors.text, fontFamily: FONTS.body.family },
            ]}
          >
            {user.bio}
          </Text>
        )}
      </View>

      {/* Action Button */}
      {isOwnProfile ? (
        <Button
          title="Edit Profile"
          onPress={onEditProfile || (() => {})}
          variant="secondary"
          size="md"
          fullWidth
        />
      ) : (
        <Button
          title="Follow"
          onPress={() => console.log('Follow')}
          variant="primary"
          size="md"
          fullWidth
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: SPACING.lg,
  },
  topActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.full,
    marginRight: SPACING.lg,
  },
  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  info: {
    marginBottom: SPACING.lg,
  },
  name: {
    fontSize: FONT_SIZES['2xl'],
    fontWeight: '700',
    marginBottom: 4,
  },
  username: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.sm,
  },
  bio: {
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
    lineHeight: 22,
  },
});