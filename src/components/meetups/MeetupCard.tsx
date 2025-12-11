// src/components/meetups/MeetupCard.tsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar, MapPin, Users, Clock } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';
import Card from '../common/Card';
import Button from '../common/Button';

export interface Meetup {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: {
    name: string;
    avatar: string;
  };
  attendees: number;
  maxAttendees?: number;
  isAttending: boolean;
}

interface MeetupCardProps {
  meetup: Meetup;
  onPress?: () => void;
  onAttend?: () => void;
}

export default function MeetupCard({ meetup, onPress, onAttend }: MeetupCardProps) {
  const { colors } = useThemeStore();

  return (
    <Card onPress={onPress} padding="lg" style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: colors.text, fontFamily: FONTS.heading.family },
          ]}
        >
          {meetup.title}
        </Text>
      </View>

      {/* Description */}
      <Text
        style={[
          styles.description,
          { color: colors.textSecondary, fontFamily: FONTS.body.family },
        ]}
        numberOfLines={2}
      >
        {meetup.description}
      </Text>

      {/* Details */}
      <View style={styles.details}>
        <View style={styles.detailItem}>
          <Calendar color={colors.textSecondary} size={16} strokeWidth={2} />
          <Text
            style={[
              styles.detailText,
              { color: colors.text, fontFamily: FONTS.body.family },
            ]}
          >
            {meetup.date}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Clock color={colors.textSecondary} size={16} strokeWidth={2} />
          <Text
            style={[
              styles.detailText,
              { color: colors.text, fontFamily: FONTS.body.family },
            ]}
          >
            {meetup.time}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <MapPin color={colors.textSecondary} size={16} strokeWidth={2} />
          <Text
            style={[
              styles.detailText,
              { color: colors.text, fontFamily: FONTS.body.family },
            ]}
            numberOfLines={1}
          >
            {meetup.location}
          </Text>
        </View>

        <View style={styles.detailItem}>
          <Users color={colors.textSecondary} size={16} strokeWidth={2} />
          <Text
            style={[
              styles.detailText,
              { color: colors.text, fontFamily: FONTS.body.family },
            ]}
          >
            {meetup.attendees}
            {meetup.maxAttendees && `/${meetup.maxAttendees}`}
          </Text>
        </View>
      </View>

      {/* Action */}
      <Button
        title={meetup.isAttending ? 'Attending' : 'Join Meetup'}
        onPress={onAttend || (() => {})}
        variant={meetup.isAttending ? 'secondary' : 'primary'}
        size="md"
        fullWidth
        style={styles.button}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: SPACING.md,
  },
  header: {
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: FONT_SIZES.xl,
    fontWeight: '700',
  },
  description: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    lineHeight: 20,
    marginBottom: SPACING.md,
  },
  details: {
    gap: SPACING.sm,
    marginBottom: SPACING.lg,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  detailText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '600',
    flex: 1,
  },
  button: {
    marginTop: SPACING.xs,
  },
});