// src/screens/meetups/CreateMeetupScreen.tsx
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { X, Calendar, Clock, MapPin, Users } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';

export default function CreateMeetupScreen() {
  const { colors } = useThemeStore();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');

  const handleCreate = () => {
    if (title && description && date && time && location) {
      console.log('Creating meetup:', {
        title,
        description,
        date,
        time,
        location,
        maxAttendees: maxAttendees ? parseInt(maxAttendees) : undefined,
      });
      // TODO: Create meetup
      navigation.goBack();
    }
  };

  const canCreate = title.trim() && description.trim() && date.trim() && time.trim() && location.trim();

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
            Create Meetup
          </Text>
          <View style={{ width: 28 }} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Title */}
          <Input
            label="Event Title"
            placeholder="e.g., Weekend Car Meet"
            value={title}
            onChangeText={setTitle}
            containerStyle={styles.input}
          />

          {/* Description */}
          <View style={styles.input}>
            <Text style={[styles.label, { color: colors.text, fontFamily: FONTS.body.family }]}>
              Description
            </Text>
            <TextInput
              style={[
                styles.textArea,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  fontFamily: FONTS.body.family,
                  borderColor: colors.border,
                },
              ]}
              placeholder="Tell people what this meetup is about..."
              placeholderTextColor={colors.textTertiary}
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>

          {/* Date & Time */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: FONTS.heading.family }]}>
              When
            </Text>

            <View style={styles.iconInputRow}>
              <View style={styles.iconInputIcon}>
                <Calendar color={colors.textSecondary} size={20} strokeWidth={2} />
              </View>
              <TextInput
                style={[
                  styles.iconInput,
                  {
                    backgroundColor: colors.surface,
                    color: colors.text,
                    fontFamily: FONTS.body.family,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Date (e.g., Dec 20, 2024)"
                placeholderTextColor={colors.textTertiary}
                value={date}
                onChangeText={setDate}
              />
            </View>

            <View style={styles.iconInputRow}>
              <View style={styles.iconInputIcon}>
                <Clock color={colors.textSecondary} size={20} strokeWidth={2} />
              </View>
              <TextInput
                style={[
                  styles.iconInput,
                  {
                    backgroundColor: colors.surface,
                    color: colors.text,
                    fontFamily: FONTS.body.family,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Time (e.g., 10:00 AM)"
                placeholderTextColor={colors.textTertiary}
                value={time}
                onChangeText={setTime}
              />
            </View>
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: FONTS.heading.family }]}>
              Where
            </Text>

            <View style={styles.iconInputRow}>
              <View style={styles.iconInputIcon}>
                <MapPin color={colors.textSecondary} size={20} strokeWidth={2} />
              </View>
              <TextInput
                style={[
                  styles.iconInput,
                  {
                    backgroundColor: colors.surface,
                    color: colors.text,
                    fontFamily: FONTS.body.family,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Event location"
                placeholderTextColor={colors.textTertiary}
                value={location}
                onChangeText={setLocation}
              />
            </View>
          </View>

          {/* Max Attendees */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text, fontFamily: FONTS.heading.family }]}>
              Capacity (Optional)
            </Text>

            <View style={styles.iconInputRow}>
              <View style={styles.iconInputIcon}>
                <Users color={colors.textSecondary} size={20} strokeWidth={2} />
              </View>
              <TextInput
                style={[
                  styles.iconInput,
                  {
                    backgroundColor: colors.surface,
                    color: colors.text,
                    fontFamily: FONTS.body.family,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Maximum attendees (leave blank for unlimited)"
                placeholderTextColor={colors.textTertiary}
                value={maxAttendees}
                onChangeText={setMaxAttendees}
                keyboardType="numeric"
              />
            </View>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={[styles.bottomBar, { backgroundColor: colors.surface, borderTopColor: colors.border }]}>
          <Button
            title="Create Meetup"
            onPress={handleCreate}
            variant="primary"
            size="lg"
            disabled={!canCreate}
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
  input: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    marginBottom: SPACING.xs,
  },
  textArea: {
    borderRadius: RADIUS.md,
    borderWidth: 2,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
    minHeight: 120,
    textAlignVertical: 'top',
  },
  section: {
    marginBottom: SPACING['2xl'],
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    marginBottom: SPACING.md,
  },
  iconInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconInputIcon: {
    width: 44,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconInput: {
    flex: 1,
    borderRadius: RADIUS.md,
    borderWidth: 2,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
  },
  bottomBar: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.lg,
    paddingBottom: 80, // Large padding for Android navigation bar
    borderTopWidth: 1,
  },
});