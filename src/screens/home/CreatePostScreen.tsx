// src/screens/home/CreatePostScreen.tsx
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { X, Image as ImageIcon, MapPin, Tag } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';
import Button from '../../components/common/Button';

const CATEGORIES = ['Build', 'Review', 'Meet', 'Discussion', 'Question'];

export default function CreatePostScreen() {
  const { colors } = useThemeStore();
  const navigation = useNavigation();
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [location, setLocation] = useState('');

  const handleImagePick = () => {
    // Mock image selection - in real app, use expo-image-picker
    const mockImages = [
      'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    ];
    setSelectedImage(mockImages[Math.floor(Math.random() * mockImages.length)]);
  };

  const handlePost = () => {
    if (content.trim()) {
      console.log('Creating post:', {
        content,
        image: selectedImage,
        category: selectedCategory,
        location,
      });
      // TODO: Add to posts list
      navigation.goBack();
    }
  };

  const canPost = content.trim().length > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
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
            Create Post
          </Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Text Input */}
          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                fontFamily: FONTS.body.family,
              },
            ]}
            placeholder="What's on your mind?"
            placeholderTextColor={colors.textTertiary}
            value={content}
            onChangeText={setContent}
            multiline
            autoFocus
            maxLength={500}
          />

          {/* Character Count */}
          <Text
            style={[
              styles.charCount,
              {
                color: content.length > 450 ? colors.error : colors.textTertiary,
                fontFamily: FONTS.body.family,
              },
            ]}
          >
            {content.length}/500
          </Text>

          {/* Selected Image */}
          {selectedImage && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              <TouchableOpacity
                style={[styles.removeImageButton, { backgroundColor: colors.surface }]}
                onPress={() => setSelectedImage(null)}
                activeOpacity={0.7}
              >
                <X color={colors.text} size={20} strokeWidth={2.5} />
              </TouchableOpacity>
            </View>
          )}

          {/* Category Selection */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Tag color={colors.textSecondary} size={20} strokeWidth={2} />
              <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: FONTS.body.family }]}>
                Category
              </Text>
            </View>
            <View style={styles.categories}>
              {CATEGORIES.map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    {
                      backgroundColor: selectedCategory === category ? colors.accent : colors.surface,
                      borderColor: selectedCategory === category ? colors.accent : colors.border,
                    },
                  ]}
                  onPress={() => setSelectedCategory(category)}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      {
                        color: selectedCategory === category ? colors.background : colors.text,
                        fontFamily: FONTS.body.family,
                      },
                    ]}
                  >
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Location Input */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MapPin color={colors.textSecondary} size={20} strokeWidth={2} />
              <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: FONTS.body.family }]}>
                Location (Optional)
              </Text>
            </View>
            <TextInput
              style={[
                styles.locationInput,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  fontFamily: FONTS.body.family,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Add location..."
              placeholderTextColor={colors.textTertiary}
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </ScrollView>

        {/* Bottom Actions */}
        <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <TouchableOpacity
            style={[styles.mediaButton, { backgroundColor: colors.background }]}
            onPress={handleImagePick}
            activeOpacity={0.7}
          >
            <ImageIcon color={colors.accent} size={24} strokeWidth={2} />
          </TouchableOpacity>

          <Button
            title="Post"
            onPress={handlePost}
            variant="primary"
            size="md"
            disabled={!canPost}
            style={styles.postButton}
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
  input: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '500',
    lineHeight: 28,
    minHeight: 150,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    textAlign: 'right',
    marginTop: SPACING.sm,
  },
  imageContainer: {
    marginTop: SPACING.lg,
    position: 'relative',
  },
  selectedImage: {
    width: '100%',
    height: 300,
    borderRadius: RADIUS.lg,
    backgroundColor: '#1A1A1A',
  },
  removeImageButton: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    width: 36,
    height: 36,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginTop: SPACING['2xl'],
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  categoryChip: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.full,
    borderWidth: 1.5,
  },
  categoryText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '700',
  },
  locationInput: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
    borderWidth: 1.5,
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderTopWidth: 1,
  },
  mediaButton: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postButton: {
    flex: 1,
    marginLeft: SPACING.md,
  },
});