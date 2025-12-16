// src/screens/chat/ChatDetailScreen.tsx
import { useState, useRef, useEffect } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Send, Phone, Video, MoreVertical } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeStore } from '../../store/themeStore';
import { FONTS, FONT_SIZES, SPACING, RADIUS } from '../../constants/theme';

interface Message {
  id: string;
  text: string;
  isMine: boolean;
  timestamp: string;
}

const MOCK_USER = {
  name: 'John Doe',
  avatar: 'https://i.pravatar.cc/150?img=1',
  online: true,
};

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Hey! Did you see my new exhaust setup?',
    isMine: false,
    timestamp: '10:30 AM',
  },
  {
    id: '2',
    text: 'Yeah man! Sounds amazing! What brand did you go with?',
    isMine: true,
    timestamp: '10:32 AM',
  },
  {
    id: '3',
    text: 'Got the Invidia R400. Worth every penny!',
    isMine: false,
    timestamp: '10:33 AM',
  },
  {
    id: '4',
    text: 'Nice! I was looking at that one too. How much was the install?',
    isMine: true,
    timestamp: '10:35 AM',
  },
  {
    id: '5',
    text: 'Got a buddy who did it for me, but shop quoted around $300',
    isMine: false,
    timestamp: '10:36 AM',
  },
];

export default function ChatDetailScreen() {
  const { colors } = useThemeStore();
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: false });
  }, [messages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: String(messages.length + 1),
        text: inputText,
        isMine: true,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setInputText('');
    }
  };

  // Hide Tab Bar for immersive chat
  useEffect(() => {
    const parent = navigation.getParent();
    parent?.setOptions({ tabBarStyle: { display: 'none' } });
    return () => {
      parent?.setOptions({
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: 'transparent',
          height: 90 // Re-applying approximate default or we need to read from theme
        }
      });
      // Better strategy: Let the tab bar component handle itself, but 'display: none' is standard hack.
      // A safer way is to just set tabBarStyle undefined to reset to default
      parent?.setOptions({ tabBarStyle: undefined });
    };
  }, [navigation]);


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust based on header
      >
        {/* Header */}
        <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
            activeOpacity={0.7}
          >
            <Text style={[styles.backText, { color: colors.text, fontFamily: FONTS.body.family }]}>
              ←
            </Text>
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Image source={{ uri: MOCK_USER.avatar }} style={styles.headerAvatar} />
            <View>
              <Text style={[styles.headerName, { color: colors.text, fontFamily: FONTS.body.family }]}>
                {MOCK_USER.name}
              </Text>
              <Text style={[styles.headerStatus, { color: colors.textSecondary, fontFamily: FONTS.body.family }]}>
                {MOCK_USER.online ? 'Online' : 'Offline'}
              </Text>
            </View>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
              <Phone color={colors.text} size={20} strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
              <Video color={colors.text} size={20} strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message) => (
            <View key={message.id}>
              <View
                style={[
                  styles.messageBubble,
                  message.isMine ? styles.myMessage : styles.theirMessage,
                ]}
              >
                <View
                  style={[
                    styles.bubble,
                    {
                      // STRICT MONOCHROME: Mine = White Text on Black (or inverse)
                      backgroundColor: message.isMine ? colors.text : colors.surface,
                      borderWidth: message.isMine ? 0 : 1,
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      {
                        // Inverse color for 'Mine'
                        color: message.isMine ? colors.background : colors.text,
                        fontFamily: FONTS.body.family,
                      },
                    ]}
                  >
                    {message.text}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.timestamp,
                  {
                    color: colors.textTertiary,
                    fontFamily: FONTS.body.family,
                    textAlign: message.isMine ? 'right' : 'left',
                  },
                ]}
              >
                {message.timestamp}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Input */}
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
            placeholder="Type a message..."
            placeholderTextColor={colors.textTertiary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              {
                backgroundColor: inputText.trim() ? colors.accent : colors.surface,
              },
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}
            activeOpacity={0.8}
          >
            <Send
              color={inputText.trim() ? colors.background : colors.textTertiary}
              size={20}
              strokeWidth={2.5}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView >
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
  backButton: {
    marginRight: SPACING.sm,
  },
  backText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: RADIUS.md,
  },
  headerName: {
    fontSize: FONT_SIZES.base,
    fontWeight: '700',
  },
  headerStatus: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
  },
  headerActions: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: SPACING.lg,
  },
  messageBubble: {
    marginBottom: SPACING.lg,
    maxWidth: '75%',
  },
  myMessage: {
    alignSelf: 'flex-end',
  },
  theirMessage: {
    alignSelf: 'flex-start',
  },
  bubble: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.lg,
    marginBottom: SPACING.xs,
  },
  messageText: {
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
    lineHeight: 20,
  },
  timestamp: {
    fontSize: FONT_SIZES.xs,
    fontWeight: '600',
    paddingHorizontal: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: SPACING.md,
    gap: SPACING.sm,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderRadius: RADIUS.lg,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: FONT_SIZES.base,
    fontWeight: '500',
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
});