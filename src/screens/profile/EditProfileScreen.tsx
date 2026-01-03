// src/screens/profile/EditProfileScreen.tsx
import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { X, Camera } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function EditProfileScreen() {
  const { colors } = useThemeStore();
  const navigation = useNavigation();

  const [name, setName] = useState('Alex Rodriguez');
  const [username, setUsername] = useState('alexrods');
  const [bio, setBio] = useState('Building dreams one mod at a time 🏎️\nTrack enthusiast | JDM lover');
  const [avatar] = useState('https://i.pravatar.cc/200?img=3');

  const handleSave = () => {
    console.log('Saving profile:', { name, username, bio });
    // TODO: Save profile changes
    navigation.goBack();
  };

  const canSave = name.trim() && username.trim();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={[styles.header, { borderBottomColor: colors.border }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.closeButton}
            activeOpacity={0.7}
          >
            <X color={colors.text} size={28} strokeWidth={2.5} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text, fontFamily: FONTS.heading.family }]}>
            Edit Profile
          </Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: avatar }} style={styles.avatar} />
              <TouchableOpacity
                style={[styles.cameraButton, { backgroundColor: colors.accent }]}
                activeOpacity={0.7}
              >
                <Camera color={colors.background} size={20} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={[styles.changePhotoText, { color: colors.accent, fontFamily: FONTS.body.family }]}>
                Change Photo
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Name"
              placeholder="Your name"
              value={name}
              onChangeText={setName}
              containerStyle={styles.input}
            />

            <Input
              label="Username"
              placeholder="username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              containerStyle={styles.input}
            />

            <Input
              label="Bio"
              placeholder="Tell us about yourself..."
              value={bio}
              onChangeText={setBio}
              multiline
              maxLength={150}
              containerStyle={styles.input}
              style={{
                minHeight: 100,
                textAlignVertical: 'top',
                paddingTop: SPACING.lg,
              }}
            />
            <Text style={[styles.charCount, { color: colors.textTertiary, fontFamily: FONTS.body.family }]}>
              {bio.length}/150
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <Button
            title="Save Changes"
            onPress={handleSave}
            variant="primary"
            size="lg"
            disabled={!canSave}
            fullWidth
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  closeButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: SPACING['2xl'],
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SPACING.md,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: RADIUS['2xl'],
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  changePhotoText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
  },
  form: {
    marginTop: SPACING.lg,
  },
  input: {
    marginBottom: SPACING.lg,
  },
  charCount: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    textAlign: 'right',
    marginTop: SPACING.xs,
  },
  bottomBar: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: 80, // Large padding for Android navigation bar
    borderTopWidth: 1,
  },
});