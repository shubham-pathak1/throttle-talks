// src/screens/meetups/MeetupsScreen.tsx
import { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, Filter, Calendar as CalendarIcon, MapPin } from 'lucide-react-native';
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

const DATES = [
  { day: '15', label: 'Sun' },
  { day: '16', label: 'Mon' },
  { day: '17', label: 'Tue' },
  { day: '18', label: 'Wed', active: true },
  { day: '19', label: 'Thu' },
  { day: '20', label: 'Fri' },
  { day: '21', label: 'Sat' },
];

export default function MeetupsScreen() {
  const { colors } = useThemeStore();
  const navigation = useNavigation();
  const [meetups, setMeetups] = useState<Meetup[]>(MOCK_MEETUPS);
  const [selectedDate, setSelectedDate] = useState('18');

  const handleCreateMeetup = () => {
    navigation.navigate('CreateMeetup' as never);
  };

  const handleFilter = () => {
    console.log('Filter meetups');
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

  const renderDateItem = ({ item }: { item: typeof DATES[0] }) => {
    const isSelected = item.day === selectedDate;
    return (
      <TouchableOpacity
        style={[
          styles.dateItem,
          {
            backgroundColor: isSelected ? colors.accent : colors.surface,
            borderColor: isSelected ? colors.accent : colors.border,
          }
        ]}
        onPress={() => setSelectedDate(item.day)}
        activeOpacity={0.7}
      >
        <Text style={[styles.dateDay, { color: isSelected ? '#FFF' : colors.text }]}>{item.day}</Text>
        <Text style={[styles.dateLabel, { color: isSelected ? 'rgba(255,255,255,0.7)' : colors.textSecondary }]}>{item.label}</Text>
      </TouchableOpacity>
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
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <MapPin size={14} color={colors.accent} />
            <Text
              style={[
                styles.subtitle,
                { color: colors.textSecondary, fontFamily: FONTS.body.family },
              ]}
            >
              San Francisco, CA
            </Text>
          </View>
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
            style={[styles.addButton, { backgroundColor: colors.accent }]}
            activeOpacity={0.7}
          >
            <Plus color={colors.background} size={24} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Date Strip */}
      <View style={{ marginBottom: SPACING.lg }}>
        <FlatList
          data={DATES}
          renderItem={renderDateItem}
          keyExtractor={item => item.day}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SPACING.lg, gap: SPACING.sm }}
        />
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>Upcoming Events</Text>

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
        <View style={{ height: 40 }} />
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
    marginBottom: SPACING.md,
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
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateItem: {
    width: 50,
    height: 64,
    borderRadius: RADIUS.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  dateDay: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  dateLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: '700',
    marginLeft: SPACING.lg,
    marginBottom: SPACING.md,
    fontFamily: FONTS.heading.family,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xl,
  },
});
