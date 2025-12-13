// src/screens/meetups/MeetupsScreen.tsx
import { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Filter } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';
import MeetupCard, { Meetup } from '../../components/meetups/MeetupCard';

const MOCK_MEETUPS: Meetup[] = [
  {
    id: '1',
    title: 'Cars & Coffee - Downtown',
    description: 'Monthly cars and coffee meetup. All makes and models welcome! Bring your ride and enjoy some great coffee.',
    date: 'Dec 15, 2024',
    time: '8:00 AM',
    location: 'Downtown Coffee House',
    organizer: {
      name: 'Mike Johnson',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
    attendees: 47,
    maxAttendees: 100,
    isAttending: true,
  },
  {
    id: '2',
    title: 'Track Day at Raceway',
    description: 'Open track day for all skill levels. Professional instructors available. Safety gear required.',
    date: 'Dec 18, 2024',
    time: '7:00 AM',
    location: 'City Raceway Park',
    organizer: {
      name: 'Sarah Chen',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    attendees: 23,
    maxAttendees: 30,
    isAttending: false,
  },
  {
    id: '3',
    title: 'JDM Night Cruise',
    description: 'Evening cruise through the city with fellow JDM enthusiasts. Photo stops included.',
    date: 'Dec 20, 2024',
    time: '7:00 PM',
    location: 'Harbor Point Parking',
    organizer: {
      name: 'Alex Kim',
      avatar: 'https://i.pravatar.cc/150?img=15',
    },
    attendees: 31,
    isAttending: false,
  },
];

export default function MeetupsScreen() {
  const { colors } = useThemeStore();
  const navigation = useNavigation();
  const [meetups, setMeetups] = useState<Meetup[]>(MOCK_MEETUPS);

  const handleCreateMeetup = () => {
    navigation.navigate('CreateMeetup' as never);
  };

  const handleFilter = () => {
    console.log('Filter meetups');
    // TODO: Show filter modal
  };

  const handleAttend = (meetupId: string) => {
    setMeetups(
      meetups.map((meetup) =>
        meetup.id === meetupId
          ? {
              ...meetup,
              isAttending: !meetup.isAttending,
              attendees: meetup.isAttending
                ? meetup.attendees - 1
                : meetup.attendees + 1,
            }
          : meetup
      )
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text
            style={[
              styles.title,
              { color: colors.text, fontFamily: FONTS.heading.family },
            ]}
          >
            Meetups
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: colors.textSecondary, fontFamily: FONTS.body.family },
            ]}
          >
            {meetups.length} upcoming events
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={handleFilter}
            style={[styles.iconButton, { backgroundColor: colors.surface }]}
            activeOpacity={0.7}
          >
            <Filter color={colors.text} size={20} strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleCreateMeetup}
            style={[styles.addButton, { backgroundColor: colors.primary }]}
            activeOpacity={0.7}
          >
            <Plus color={colors.background} size={24} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Meetups */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {meetups.map((meetup) => (
          <MeetupCard
            key={meetup.id}
            meetup={meetup}
            onPress={() => console.log('View meetup', meetup.id)}
            onAttend={() => handleAttend(meetup.id)}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
  },
  title: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  iconButton: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
  },
});