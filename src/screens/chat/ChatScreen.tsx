// src/screens/chat/ChatScreen.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Search, PenSquare } from 'lucide-react-native';
import { MotiView } from 'moti';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS, LAYOUT, ANIMATIONS } from '../../constants/theme';

interface ChatPreview {
  id: string;
  name: string;
  username: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: boolean;
  online?: boolean;
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
    online: true,
  },
  {
    id: '2',
    name: 'Sarah Miller',
    username: 'sarahdrifts',
    avatar: 'https://i.pravatar.cc/150?img=5',
    lastMessage: 'See you at the track day tomorrow!',
    timestamp: '1h',
    unread: true,
    online: true,
  },
  {
    id: '3',
    name: 'Mike Chen',
    username: 'mikespeed',
    avatar: 'https://i.pravatar.cc/150?img=8',
    lastMessage: 'Thanks for the recommendation',
    timestamp: '3h',
    unread: false,
    online: false,
  },
  {
    id: '4',
    name: 'Alex Kim',
    username: 'alexjdm',
    avatar: 'https://i.pravatar.cc/150?img=15',
    lastMessage: 'That exhaust sound is insane',
    timestamp: '1d',
    unread: false,
    online: false,
  },
];

export default function ChatScreen() {
  const { colors, colorScheme } = useThemeStore();
  const navigation = useNavigation();
  const isDark = colorScheme === 'dark';

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

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: LAYOUT.bottomSpacer }}
      >
        {MOCK_CHATS.map((chat, index) => (
          <MotiView
            key={chat.id}
            from={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ delay: index * 50, type: 'timing', duration: 250 }}
          >
            <TouchableOpacity
              style={[
                styles.chatItem,
                { borderBottomColor: colors.border },
              ]}
              onPress={() => (navigation.navigate as any)('ChatDetail', { chatId: chat.id, userName: chat.name })}
              activeOpacity={0.7}
            >
              <View style={styles.avatarContainer}>
                <Image source={{ uri: chat.avatar }} style={styles.avatar} />
                {chat.online && (
                  <View style={[styles.onlineIndicator, { backgroundColor: '#22C55E', borderColor: colors.background }]} />
                )}
              </View>
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
                        color: chat.unread ? colors.text : colors.textTertiary,
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
                        fontWeight: chat.unread ? '600' : '400',
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {chat.lastMessage}
                  </Text>
                  {chat.unread && (
                    <View style={[styles.unreadBadge, { backgroundColor: colors.text }]} />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          </MotiView>
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
  avatarContainer: {
    position: 'relative',
    marginRight: SPACING.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: RADIUS.lg,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
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
    fontWeight: '600',
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