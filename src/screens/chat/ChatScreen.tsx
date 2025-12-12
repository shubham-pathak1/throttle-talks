// src/screens/chat/ChatScreen.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Search, PenSquare } from 'lucide-react-native';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';

interface ChatPreview {
  id: string;
  name: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
}

const MOCK_CHATS: ChatPreview[] = [
  {
    id: '1',
    name: 'John Doe',
    username: 'johndoe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'Yeah man, the turbo upgrade is sick!',
    timestamp: '2m',
    unread: true,
  },
  {
    id: '2',
    name: 'Sarah Miller',
    username: 'sarahdrifts',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'See you at the track day tomorrow!',
    timestamp: '1h',
    unread: true,
  },
  {
    id: '3',
    name: 'Mike Chen',
    username: 'mikespeed',
    avatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: 'Thanks for the recommendation',
    timestamp: '3h',
    unread: false,
  },
  {
    id: '4',
    name: 'Alex Kim',
    username: 'alexjdm',
    avatar: 'https://i.pravatar.cc/150?img=15',
    lastMessage: 'That exhaust sound is insane',
    timestamp: '1d',
    unread: false,
  },
];

export default function ChatScreen() {
  const { colors } = useThemeStore();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text
          style={[
            styles.title,
            { color: colors.text, fontFamily: FONTS.heading.family },
          ]}
        >
          Messages
        </Text>
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.7}
            onPress={() => console.log('Search')}
          >
            <Search color={colors.text} size={22} strokeWidth={2.5} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            activeOpacity={0.7}
            onPress={() => console.log('New message')}
          >
            <PenSquare color={colors.text} size={22} strokeWidth={2.5} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat List */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_CHATS.map((chat) => (
          <TouchableOpacity
            key={chat.id}
            style={[
              styles.chatItem,
              { borderBottomColor: colors.border },
            ]}
            onPress={() => navigation.navigate('ChatDetail' as never, { chatId: chat.id, userName: chat.name } as never)}
            activeOpacity={0.7}
          >
            <Image source={{ uri: chat.avatar }} style={styles.avatar} />
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text
                  style={[
                    styles.chatName,
                    { color: colors.text, fontFamily: FONTS.body.family },
                  ]}
                >
                  {chat.name}
                </Text>
                <Text
                  style={[
                    styles.timestamp,
                    { 
                      color: chat.unread ? colors.accent : colors.textTertiary,
                      fontFamily: FONTS.body.family 
                    },
                  ]}
                >
                  {chat.timestamp}
                </Text>
              </View>
              <View style={styles.messageRow}>
                <Text
                  style={[
                    styles.lastMessage,
                    {
                      color: chat.unread ? colors.text : colors.textSecondary,
                      fontFamily: FONTS.body.family,
                    },
                  ]}
                  numberOfLines={1}
                >
                  {chat.lastMessage}
                </Text>
                {chat.unread && (
                  <View style={[styles.unreadBadge, { backgroundColor: colors.accent }]} />
                )}
              </View>
            </View>
          </TouchableOpacity>
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
    paddingVertical: SPACING.lg,
  },
  title: {
    fontSize: FONT_SIZES['3xl'],
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.sm,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  chatItem: {
    flexDirection: 'row',
    padding: SPACING.lg,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.lg,
    marginRight: SPACING.md,
  },
  chatContent: {
    flex: 1,
    justifyContent: 'center',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
  },
  timestamp: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '700',
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontSize: FONT_SIZES.sm,
    fontWeight: '500',
    flex: 1,
  },
  unreadBadge: {
    width: 10,
    height: 10,
    borderRadius: RADIUS.full,
    marginLeft: SPACING.sm,
  },
});